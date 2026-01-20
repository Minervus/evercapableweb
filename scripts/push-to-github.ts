// Script to create GitHub repo and push code
// Uses Replit GitHub integration

import { Octokit } from '@octokit/rest';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function main() {
  try {
    console.log('Getting GitHub client...');
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user info
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    const repoName = 'evercapableweb';
    
    // Check if repo already exists
    try {
      await octokit.repos.get({
        owner: user.login,
        repo: repoName
      });
      console.log(`Repository ${repoName} already exists.`);
    } catch (error: any) {
      if (error.status === 404) {
        // Create new repository
        console.log(`Creating repository: ${repoName}...`);
        await octokit.repos.createForAuthenticatedUser({
          name: repoName,
          description: 'EverCapable Coaching Website - Nutrition coaching and habit layering for high-achievers',
          private: false,
          auto_init: false
        });
        console.log(`Repository created successfully!`);
      } else {
        throw error;
      }
    }
    
    // Output the remote URL for git commands
    const remoteUrl = `https://github.com/${user.login}/${repoName}.git`;
    console.log(`\nRemote URL: ${remoteUrl}`);
    console.log(`\nRepository is ready. Use this URL to set up the remote.`);
    
    // Write remote URL to a temp file for the bash script to use
    const fs = await import('fs');
    fs.writeFileSync('/tmp/github_remote_url.txt', remoteUrl);
    fs.writeFileSync('/tmp/github_username.txt', user.login);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// IMPORTANT: Replace this with your actual Sanity Project ID once created!
export const projectId = '49ykafev'; 
export const dataset = 'production';
export const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  useCdn: true, // Use false if you want instantly fresh data instead of cached
  apiVersion,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

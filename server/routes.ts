import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import Parser from "rss-parser";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // In-memory cache for the RSS feed (approx 1 hr)
  let cachedArticles: any = null;
  let cacheTime = 0;
  const CACHE_DURATION = 3600 * 1000;

  app.get("/api/articles", async (_req, res) => {
    try {
      if (cachedArticles && (Date.now() - cacheTime < CACHE_DURATION)) {
        return res.json(cachedArticles);
      }
      
      const parser = new Parser();
      const feed = await parser.parseURL("https://evercapable.substack.com/feed");
      
      // Limit to 3 articles and pick only necessary fields
      const articles = feed.items.slice(0, 3).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        contentSnippet: item.contentSnippet,
      }));

      cachedArticles = articles;
      cacheTime = Date.now();
      
      res.json(articles);
    } catch (error) {
      console.error("Failed to fetch RSS:", error);
      // Fallback gracefully to stale cache if a fetch fails
      if (cachedArticles) {
         return res.json(cachedArticles);
      }
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, error: validationError.message });
      } else {
        res.status(500).json({ success: false, error: "Failed to send message" });
      }
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch {
      res.status(500).json({ error: "Failed to retrieve messages" });
    }
  });

  return httpServer;
}

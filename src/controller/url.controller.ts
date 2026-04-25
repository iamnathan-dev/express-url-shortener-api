import { Request, Response } from "express";
import { UrlService } from "../services/url.service";

export class UrlController {
  static async createShortUrl(req: Request, res: Response) {
    try {
      const { originalUrl, alias } = req.body;
      const shortCode = await UrlService.createShortUrl(
        originalUrl,
        alias.trim(),
      );
      res.status(201).json({ status: "Success", shortCode });
    } catch (error: any) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async redirectToOriginalUrl(req: Request, res: Response) {
    try {
      const { shortCode } = req.params;
      const originalUrl = await UrlService.getOriginalUrl(
        shortCode as string,
        req.ip as string,
        req.headers["user-agent"] || "Unknown",
      );
      if (originalUrl) {
        res.redirect(originalUrl);
      } else {
        res.status(404).json({ error: "URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to redirect to original URL" });
    }
  }
}

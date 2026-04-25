import Url from "../models/url.models";
import { nanoid } from "nanoid";
import { isValidAlias } from "../utils/validations.util";
import { redis } from "../utils/redis.util";

export class UrlService {
  static async createShortUrl(originalUrl: string, alias: string) {
    if (!isValidAlias(alias)) {
      throw new Error(
        "Invalid alias format. Use 3-20 characters with no space (letters, numbers, _ or -).",
      );
    }

    const shortCode = alias || nanoid(8);

    const existing = await Url.findOne({ shortCode });
    if (existing) {
      throw new Error("Alias/short code already in use");
    }

    const newUrl = await Url.create({ originalUrl, shortCode });

    return newUrl;
  }

  static async getOriginalUrl(
    shortCode: string,
    ip: string,
    userAgent: string,
  ): Promise<string | null> {
    const cached = await redis.get(shortCode);
    if (cached) {
      return cached;
    }

    const url = await Url.findOne({ shortCode });

    if (!url) return null;

    await redis.set(shortCode, url.originalUrl, "EX", 60 * 60); // 1hr

    url.clicks++;
    url.analytics.push({ timestamp: new Date(), ip, userAgent });
    await url.save();

    return url.originalUrl;
  }
}

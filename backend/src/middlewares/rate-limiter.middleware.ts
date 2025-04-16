import { Request, Response, NextFunction } from 'express';
import redis from '../db/redis';
import { AuthenticatedRequest } from '../types/misc.types';
import rateLimitConfig from '../config/rate-limit.config';

export const rateLimiter = () => {
  const { perMinute, perHour, perDay } = rateLimitConfig;

  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // If redis is not available, just skip rate limiting
    if (!redis) {
      console.warn('Redis client not available, skipping rate limiting.');
      return next();
    }

    try {
      const identifier = `ip:${req.ip}`;

      const keys = {
        minute: `rate_limit:minute:${identifier}`,
        hour: `rate_limit:hour:${identifier}`,
        day: `rate_limit:day:${identifier}`,
      };

      const checkLimit = async (key: string, limit: number, time: number, message: string) => {
        const requests = await redis.incr(key);
        if (requests === 1) await redis.expire(key, time);
        if (requests > limit) {
          res.status(429).json({ message });
          throw new Error('Rate limit exceeded');
        }
      };

      await checkLimit(keys.minute, perMinute.limit, perMinute.time, 'Too many requests per minute. Please slow down.');
      await checkLimit(keys.hour, perHour.limit, perHour.time, 'Hourly request limit exceeded. Try again later.');
      await checkLimit(keys.day, perDay.limit, perDay.time, 'Daily request limit exceeded. Try again tomorrow.');

      next();
    } catch (error) {
      if (error.message !== 'Rate limit exceeded') {
        console.error('Rate limiter error:', error);
        res.status(503).json({ message: 'Service temporarily unavailable. Please try again later.' });
      }
    }
  };
};

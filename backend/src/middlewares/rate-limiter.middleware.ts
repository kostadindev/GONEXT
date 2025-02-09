import { Request, Response, NextFunction } from 'express';
import redis from '../db/redis';
import { AuthenticatedRequest } from '../types/misc.types';
import config from '../config/rate-limit.config';

interface RateLimitRule {
  rate_limit?: {
    limit: number;
    time: number;
  };
}

export const rateLimiter = (rule: RateLimitRule = {}) => {
  const { rate_limit = config.defaultRateLimit } = rule;

  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const identifier = userId ? `user:${userId}` : `ip:${req.ip}`;
      const redisKey = `rate_limit:${identifier}`;

      const requests = await redis.incr(redisKey);

      if (requests === 1) {
        await redis.expire(redisKey, rate_limit.time);
      }

      if (requests > rate_limit.limit) {
        return res.status(429).json({
          message: "Too many requests, please try again later."
        });
      }

      next();
    } catch (error) {
      console.error('Rate limiter error:', error);
      return res.status(503).json({
        message: "Service temporarily unavailable. Please try again later."
      });
    }
  };
};

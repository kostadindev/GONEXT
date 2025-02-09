const rateLimitConfig = {
  development: {
    perMinute: { limit: 10, time: 60 },            // 60 requests per minute
    perHour: { limit: 100, time: 60 * 60 },        // 500 requests per hour
    perDay: { limit: 500, time: 60 * 60 * 24 }    // 5000 requests per day
  },
  production: {
    perMinute: { limit: 10, time: 60 },            // 30 requests per minute
    perHour: { limit: 100, time: 60 * 60 },        // 300 requests per hour
    perDay: { limit: 500, time: 60 * 60 * 24 }    // 3000 requests per day
  },
  test: {
    perMinute: { limit: 100, time: 60 },          // High limit for testing
    perHour: { limit: 10000, time: 60 * 60 },
    perDay: { limit: 100000, time: 60 * 60 * 24 }
  }
};

// Export based on NODE_ENV
const environment = process.env.NODE_ENV || 'development';
export default rateLimitConfig[environment];

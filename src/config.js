const config = {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost'
  },
  api: {
    port: process.env.API_PORT || 3000
  }
}

module.exports = config;

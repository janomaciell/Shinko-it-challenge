export const CONFIG = {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
  };
  
  export const VALIDATION = {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 100,
    CONTENT_MIN_LENGTH: 1,
    CONTENT_MAX_LENGTH: 5000
  };
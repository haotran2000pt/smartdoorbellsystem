declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    JWT_SECRET: string;
    JWT_ACCESS_EXPIRATION_MINUTES: string;
    JWT_REFRESH_EXPIRATION_DAYS: string;
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: string;
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: string;
  }
}

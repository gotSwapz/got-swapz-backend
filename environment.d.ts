declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      STORAGE_PATH: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
      NFT_STORAGE_KEY: string;
      MAINNET_POLYGON_SCAN_URL: string;
      MUMBAI_POLYGON_SCAN_URL: string;
      POLYGONSCAN_API_KEY: string;
      LOCAL_RPC_URL: string;
      MAINNET_RPC_URL: string;
      MUMBAI_RPC_URL: string;
      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      S3_BUCKET_NAME: string;
      COLLECTION_LOGO_FOLDER: string;
      COLLECTION_BANNER_FOLDER: string;
      USER_AVATAR_FOLDER: string;
      USER_BANNER_FOLDER: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_PASSWORD_LOCAL: string;
      DB_DIALECT: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      WEB_URL: string;
      ENVIRONMENT: string;
      NETWORK: string;
      DROP_TABLES: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

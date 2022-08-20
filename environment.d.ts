export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_CHEC_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY: string;
    }
  }
}

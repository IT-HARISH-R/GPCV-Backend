import dov from "dotenv"
dov.config()

export const MONGODB_URL = process.env.MONGODB_URL;
export const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
export const EMAIL = process.env.EMAIL;
export const PASS = process.env.PASS;
export const KEY_ID = process.env.KEY_ID;
export const KEY_SECRET = process.env.KEY_SECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;

 
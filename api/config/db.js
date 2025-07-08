import "dotenv/config";
import { kv } from "@vercel/kv";

export const db = {
  getUser: async (key) => await kv.get(key),
  setUser: async (key, value) => await kv.set(key, value),
};

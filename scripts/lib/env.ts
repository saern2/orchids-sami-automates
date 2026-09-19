import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Loads .env.local (and .env) from the project root into process.env for
 * one-off scripts run with tsx. Existing process.env values win. Values are
 * never printed by this module.
 */
export function loadEnv(): void {
  for (const file of [".env", ".env.local"]) {
    let text: string;
    try {
      text = readFileSync(resolve(process.cwd(), file), "utf8");
    } catch {
      continue;
    }
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

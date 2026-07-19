import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', 
  out: './drizzle',             
  dialect: 'sqlite',
  dbCredentials: {
    url: "/home/mattheo/.config/fr.mattheo.jotion/db.db"
  }
});
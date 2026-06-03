import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/models/db/lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING!,
  },
});


// Note that: i am using drizzle just for saving the database schemas, the quries are written in SQL
// this path:  ./app/models/db/lib/schema.ts has the last updated schema, you can build the database using this command: 'npx drizzle-kit push', but make sure to add the db connection string in the .env
// if you want to do any changes on database, do it from neon, not from drizzle, and after updating the database, use this command:'npx drizzle-kit pull' to pull the updated db schema

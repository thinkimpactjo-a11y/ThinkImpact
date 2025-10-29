// scripts/export-slugs.js
import fs from "fs";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pg;

async function main() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();

  try {
    const consultingRes = await client.query(`SELECT slug FROM consulting WHERE slug IS NOT NULL`);
const trainingRes = await client.query(`SELECT slug FROM training WHERE slug IS NOT NULL`);

    const consulting = consultingRes.rows.map(r => r.slug).filter(Boolean);
    const training = trainingRes.rows.map(r => r.slug).filter(Boolean);

    const outDir = path.resolve(process.cwd(), "data");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    fs.writeFileSync(path.join(outDir, "slugs.json"), JSON.stringify({ consulting, training }, null, 2), "utf8");

    console.log("✅ slugs exported:", { consulting: consulting.length, training: training.length });
  } catch (err) {
    console.error("❌ failed to export slugs", err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();

import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';
import { loadSecrets } from './loadSecrets.mjs';
import { runMigrations } from './src/lib/migrations.js';
import connectToDatabase from './src/lib/mongodb.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function start() {
  try {
    await loadSecrets();
    
    // Connect to database and run migrations
    await connectToDatabase();
    await runMigrations();

    await app.prepare();

    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(process.env.PORT || 3000, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();
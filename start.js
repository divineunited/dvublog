import { createServer } from 'http';
import next from 'next';
import { parse } from 'url';
import { loadSecrets } from './loadSecrets.mjs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function start() {
  try {
    await loadSecrets();

    // Explicitly set MONGODB_URI in process.env
    process.env.MONGODB_URI = process.env.MONGODB_URI;

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
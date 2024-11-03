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
    await app.prepare();

    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    await new Promise((resolve) => {
      server.listen(process.env.PORT || 3000, () => {
        console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
        resolve(null);
      });
    });

    // TODO: Figure out why this doesn't work. I keep getting this error:
    // Error: connect ECONNREFUSED 127.0.0.1:3000
    await new Promise(resolve => setTimeout(resolve, 5000));
    try {
      const response = await fetch('http://localhost:3000/api/run-migrations', { 
        method: 'POST'
      });
      const data = await response.json();
      console.log('Migrations completed. Result:', data);
    } catch (error) {
      console.error('Migrations failed. Error:', error);
    }
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

start();
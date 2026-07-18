// Fetches a snapshot of the Alpaca paper-trading account and writes it to
// public/algo-data.json, which the static site ships as-is and fetches
// client-side. Run at deploy time (see .github/workflows/deploy.yml) so the
// API keys only ever exist inside the CI runner, never on the live server.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const KEY_ID = process.env.ALPACA_KEY_ID;
const SECRET_KEY = process.env.ALPACA_SECRET_KEY;

if (!KEY_ID || !SECRET_KEY) {
  console.error('ALPACA_KEY_ID and ALPACA_SECRET_KEY must be set in the environment.');
  process.exit(1);
}

const BASE_URL = 'https://paper-api.alpaca.markets';
const headers = {
  'APCA-API-KEY-ID': KEY_ID,
  'APCA-API-SECRET-KEY': SECRET_KEY,
};

async function alpacaGet(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Alpaca ${pathname} returned ${response.status}: ${body}`);
  }
  return response.json();
}

async function main() {
  const account = await alpacaGet('/v2/account');
  const orders = await alpacaGet('/v2/orders?status=all&limit=20&direction=desc');

  const trades = orders
    .filter((order) => order.status === 'filled')
    .slice(0, 5)
    .map((order) => ({
      symbol: order.symbol,
      side: order.side,
      qty: order.filled_qty,
      price: order.filled_avg_price,
      filledAt: order.filled_at,
    }));

  const data = {
    portfolioValue: account.portfolio_value,
    trades,
    generatedAt: new Date().toISOString(),
  };

  const outPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'public',
    'algo-data.json',
  );
  await writeFile(outPath, JSON.stringify(data, null, 2) + '\n');
  console.log(`Wrote ${outPath}:`, data);
}

main().catch((err) => {
  console.error('Failed to fetch Alpaca data:', err.message);
  process.exit(1);
});

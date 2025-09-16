import http from 'node:http';
import assert from 'node:assert';
import app from '../src/server';

const PORT = 5050;

function request(path: string, method = 'GET', body?: unknown, headers: Record<string, string> = {}) {
  return new Promise<{ status: number; data: string }>((resolve, reject) => {
    const data = body ? JSON.stringify(body) : undefined;
    const req = http.request({ hostname: 'localhost', port: PORT, path, method, headers: {
      'Content-Type': 'application/json',
      'Content-Length': data ? Buffer.byteLength(data).toString() : '0',
      ...headers,
    } }, res => {
      let chunks = '';
      res.on('data', c => chunks += c.toString());
      res.on('end', () => resolve({ status: res.statusCode ?? 0, data: chunks }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Simple test runner using node --test not required for single file
(async () => {
  process.env.NODE_ENV = 'test';
  const server = app.listen(PORT);
  try {
    const res = await request('/health');
    assert.equal(res.status, 200);
    assert.match(res.data, /"status":"ok"/);
    // eslint-disable-next-line no-console
    console.log('health.test.ts: OK');
  } finally {
    server.close();
  }
})();



const http = require('http');
const PORT = process.env.AUTH_GATEWAY_PORT || '19000';
const filePath = 'C:\\Users\\Administrator\\.qclaw\\workspace\\AI-Tech-Briefing-2026-03-24.html';

const body = JSON.stringify({ localPath: filePath, conflictStrategy: 'overwrite' });
const opts = {
  hostname: '127.0.0.1', port: parseInt(PORT),
  path: '/proxy/qclaw-cos/upload', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
};
const req = http.request(opts, (res) => {
  let d = ''; res.on('data', c => d += c); res.on('end', () => {
    console.log('STATUS:' + res.statusCode);
    console.log('RESP:' + d);
  });
});
req.on('error', e => console.log('ERR:' + e.message));
req.write(body); req.end();

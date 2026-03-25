// Use Node.js built-in http to call QClaw upload API
// The HTML content will be uploaded directly as a file via a temp approach

const http = require('http');
const path = require('path');

const PORT = process.env.AUTH_GATEWAY_PORT || '19000';

// First test connectivity
const testReq = http.request({
  hostname: '127.0.0.1',
  port: parseInt(PORT),
  path: '/proxy/qclaw-cos/list',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('RESPONSE:', data.substring(0, 500));
  });
});

testReq.on('error', (e) => {
  console.log('HTTP_ERROR:', e.message);
});

testReq.write(JSON.stringify({ dirPath: '/', limit: 3 }));
testReq.end();

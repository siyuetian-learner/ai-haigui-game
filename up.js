const http = require('http');

const PORT = process.env.AUTH_GATEWAY_PORT || '19000';
const filePath = 'C:\\Users\\Administrator\\Desktop\\AI\u79D1\u6280\u65E9\u62A5_2026\u5E743\u670825\u65E5.pdf';

const body = JSON.stringify({
  localPath: filePath,
  conflictStrategy: 'ask'
});

const options = {
  hostname: 'localhost',
  port: PORT,
  path: '/proxy/qclaw-cos/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(body);
req.end();

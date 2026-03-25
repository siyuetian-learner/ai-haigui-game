const http = require('http');

const port = process.env.AUTH_GATEWAY_PORT || '19000';
const body = JSON.stringify({
  keyword: 'AI人工智能大模型最新进展 2026年3月25日',
  from_time: 1742774400,
  cnt: 8
});

const options = {
  hostname: 'localhost',
  port: port,
  path: '/proxy/prosearch/search',
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
  console.error('ERROR: ' + e.message);
});

req.write(body);
req.end();

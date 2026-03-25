const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.AUTH_GATEWAY_PORT || '19000';

// Find the PDF - desktop path with Chinese
const desktopPath = path.join(process.env.USERPROFILE, 'Desktop');
const files = fs.readdirSync(desktopPath).filter(f => f.endsWith('.pdf') && f.includes('AI'));
console.log('PDF files on desktop:', files);

if (files.length === 0) {
  console.error('No AI PDF found on desktop');
  process.exit(1);
}

const pdfFile = path.join(desktopPath, files[0]);
const stats = fs.statSync(pdfFile);
console.log('Uploading:', pdfFile, 'Size:', stats.size);

const boundary = '----FormBoundary7MA4YWfKqrGqGW3C';
const fileName = files[0];
const fileData = fs.readFileSync(pdfFile);

const body = Buffer.concat([
  Buffer.from(`--${boundary}\r\n`),
  Buffer.from(`Content-Disposition: form-data; name="localPath"\r\n\r\n${pdfFile.replace(/\\/g, '\\\\')}\r\n`),
  Buffer.from(`--${boundary}\r\n`),
  Buffer.from(`Content-Disposition: form-data; name="conflictStrategy"\r\n\r\nask\r\n`),
  Buffer.from(`--${boundary}--\r\n`),
]);

const bodyJson = JSON.stringify({
  localPath: pdfFile,
  conflictStrategy: 'ask'
});

const options = {
  hostname: 'localhost',
  port: PORT,
  path: '/proxy/qclaw-cos/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(bodyJson)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.write(bodyJson);
req.end();

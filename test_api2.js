const https = require('https');

const data = JSON.stringify({
  model: 'MiniMax-M2.7',
  messages: [
    { role: 'user', content: '你好，请回复"API调用成功"，不需要其他内容。' }
  ],
  max_tokens: 200,
  temperature: 0.3
});

const options = {
  hostname: 'wellapi.ai',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer sk-sAkKI9va8oK3OwtsNr7R5sHa17ezHW1ajCDKp8LX8vgjH1kz',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const json = JSON.parse(body);
    const reply = json.choices?.[0]?.message?.content || json.choices?.[0]?.message?.reasoning_content || '(empty)';
    console.log('状态: OK (200)');
    console.log('模型: ' + json.model);
    console.log('回复: ' + reply.trim());
    console.log('消耗: prompt=' + json.usage?.prompt_tokens + ' | completion=' + json.usage?.completion_tokens + ' | total=' + json.usage?.total_tokens);
  });
});

req.on('error', (e) => console.log('ERROR:', e.message));
req.write(data);
req.end();

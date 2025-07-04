const mqtt = require('mqtt');
const fs = require('fs');

const options = {
  host: 'localhost',
  port: 8883,
  protocol: 'mqtts',
  rejectUnauthorized: false,
  ca: fs.readFileSync('./certs/ca.crt')  // Ensure path is correct
};

const client = mqtt.connect(options);

client.on('connect', () => {
  console.log('✅ Connected securely to MQTT broker');
  client.subscribe('test/topic', () => {
    client.publish('test/topic', 'Hello MQTT with TLS!');
  });
});

client.on('message', (topic, message) => {
  console.log(`📩 Received: ${message.toString()}`);
});

client.on('error', (err) => {
  console.error('❌ Connection Error:', err);
});

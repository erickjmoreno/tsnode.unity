import { createClient } from 'redis';
import { redisHost, redisPort, redisPassword } from '@configs/env';

const client = createClient({
  socket: { host: redisHost, port: +redisPort },
  password: redisPassword,
});

client.on('error', (err) => console.log('Redis client Error', err));

await client.connect();

export default client;

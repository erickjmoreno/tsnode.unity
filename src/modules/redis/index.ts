import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis client Error', err));

await client.connect();

export default client;

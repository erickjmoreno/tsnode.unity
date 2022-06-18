import dotenv from 'dotenv';

dotenv.config();

export const token = process.env.DISCORD_TOKEN;
export const prefix = process.env.PREFIX;
export const channelId = process.env.CHANNEL_ID || '';
export const clientID = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const auctionChannelId = process.env.AUCTION_CHANNEL_ID;
export const serverId = process.env.SERVER_ID;
export const accountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
export const accountPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
export const spreadsheetID = process.env.GOOGLE_SPREADSHEET;
export const redisHost = process.env.REDIS_HOST || 'localhost';
export const redisPort = process.env.REDIS_PORT || 6379;
export const redisPassword = process.env.REDIS_PASSWORD;
export const guildName = process.env.GUILD_NAME || 'Unity';
export const emailUsername = process.env.UNITY_EMAIL_USERNAME || '';
export const emailPassword = process.env.UNITY_EMAIL_PASSWORD || '';
export const core1Emails = process.env.UNITY_EMAIL_CORE1 || '';
export const core2Emails = process.env.UNITY_EMAIL_CORE2 || '';

const CURRENCY_CONVERT = process.env.CURRENCY_CONVERT || '';
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const API_KEY = process.env.API_KEY || '';
const CRYPTO_ID = parseInt(process.env.CRYPTO_ID || '0');

if (!API_KEY)
    throw new Error("Invalid API_KEY/BOT_TOKEN");

if (!BOT_TOKEN)
    throw new Error("Invalid BOT_TOKEN");

if (!CRYPTO_ID)
    throw new Error("Invalid CRYPTO_ID");

if (!CURRENCY_CONVERT)
    throw new Error("Invalid CURRENCY_CONVERT");

export {
    API_KEY,
    BOT_TOKEN,
    CRYPTO_ID,
    CURRENCY_CONVERT
}

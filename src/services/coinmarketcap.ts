import axios, { AxiosInstance } from "axios";

const { API_KEY } = process.env;
if (!API_KEY)
    throw new Error("Invalid API_KEY");

const api : AxiosInstance = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1/',
    headers: { 'X-CMC_PRO_API_KEY': API_KEY }
});

export type Quote = {
    price: number;
    volume_24h: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_60d: number;
    percent_change_90d: number;
    market_cap: number;
    market_cap_dominance: number;
    fully_diluted_market_cap: number;
    last_updated: Date;
}

export const getCryptoPrice = (cryptoId: number, currencyConvert: string) => {
    return api.get(`/cryptocurrency/quotes/latest?id=${cryptoId}&convert=${currencyConvert}`)
        .then(res => res.data as any)
        .then(res => res.data[cryptoId.toString()].quote[currencyConvert.toUpperCase()] as Quote);
}
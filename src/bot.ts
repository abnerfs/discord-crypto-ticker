import { Client, Intents } from "discord.js";
import { BOT_TOKEN, CRYPTO_ID, CURRENCY_CONVERT } from './config'
import { getCryptoPrice, Quote } from "./services/coinmarketcap";
export class Bot {
    client: Client;

    constructor() {
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        this.client.on('ready', async () => {
            console.log(`Logged in as ${this.client.user?.tag}!`);
            this.startStatusJob();
        });

        this.client.login(BOT_TOKEN);
    }

    startStatusJob = async () => {
        const getStatusString = ({ percent_change_1h, price }: Quote) => {
            const [emoji, operator] = percent_change_1h >= 0 ? ['📈', '+'] : ['📉', '-'];
            return `$${price.toFixed(2)}  ${emoji} ${operator}${Math.abs(percent_change_1h).toFixed(2)}%`;
        }

        const updateStatus = async () => {
            const quote: Quote = await getCryptoPrice(CRYPTO_ID, CURRENCY_CONVERT);

            this.client.user?.setPresence({
                activities: [{
                    name: getStatusString(quote),
                    type: 'PLAYING'
                }]
            });
        }

        const updateInterval = async () => {
            try {
                await updateStatus();
            }
            catch (err: any) {
                console.log(`Error setting status ${err?.message} - ${err?.stack}`);
            }
        }

        await updateInterval();
        setInterval(updateInterval, 1000 * 60);
    }
}











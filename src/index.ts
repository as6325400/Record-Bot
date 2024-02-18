import { Client, TextChannel } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import * as dotenv from "dotenv";
import { handleMessage } from "./messageHandler";

dotenv.config();

(async () => {
  const BOT = new Client({intents: IntentOptions});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let channel : TextChannel | undefined;

  await BOT.login(process.env.BOT_TOKEN);
  
  BOT.on("ready", () => {
    console.log("Bot is ready!");
    channel = BOT.channels.cache.get(process.env.BOT_CHANNEL_ID!) as TextChannel;
  });

  BOT.on("messageCreate", async (message) => {
    handleMessage(message);
  });

})();
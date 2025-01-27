import {Client, Events, GatewayIntentBits} from "discord.js"

export default defineNitroPlugin((nitroApp) => {
    const config = useRuntimeConfig();

    if(!config.discord.bot.enable) {
        console.log("Discord bot disabled");
        return;
    }

    console.log("Starting discord bot...");

    nitroApp.hooks.hook("close", stopBot);
    startBot(config.discord.bot.token);
});

const botClient: Client<boolean> | null = null;

async function startBot(token: string) {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    client.once(Events.ClientReady, handleBotReady);
    await client.login(token);
}

function handleBotReady() {
    console.log("Discord bot is ready");

    botClient?.user?.setStatus("dnd");
}

function stopBot() {
    console.log("Discord bot is shutting down");
    botClient?.destroy();
}
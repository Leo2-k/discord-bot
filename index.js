const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Staff role name
const ROLE_NAME = "Among us managerᵛᵃˡ";

// Bot ready event
client.once("clientReady", () => {
  console.log("Bot is online 🎮");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const cmd = message.content.toLowerCase();

  // Check if user has staff role
  const isAllowed = message.member.roles.cache.some(
    (role) => role.name === ROLE_NAME
  );

  if (!isAllowed && (cmd === "!ma" || cmd === "!um")) {
    return message.reply("❌ Only Among us Manager can use this command :3");
  }

  // MUTE ALL
  if (cmd === "!ma") {
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply("❌ You must join a voice channel first");
    }

    channel.members.forEach((member) => {
      if (!member.user.bot) {
        member.voice.setMute(true).catch(() => {});
      }
    });

    return message.channel.send("🔇 Game Start All users muted");
  }

  // UNMUTE ALL
  if (cmd === "!um") {
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply("❌ You must join a voice channel first");
    }

    channel.members.forEach((member) => {
      if (!member.user.bot) {
        member.voice.setMute(false).catch(() => {});
      }
    });

    return message.channel.send("🔊 Meeting time All users unmuted");
  }
});


client.login("");

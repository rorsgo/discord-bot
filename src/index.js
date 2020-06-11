const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();

const prefix = process.env.DISCORD_BOT_PREFIX;

client.on("message", async (command) => {
  if (command.author.bot) return;
  if (!command.content.startsWith(prefix)) return;

  let botCommand = command.content.split(" ")[0];
  botCommand = botCommand.slice(prefix.length);
  
  let userMessage = command.content.split(" ").slice(1);
  try {
    let commandFile = require(`./commands/${botCommand}.js`);
    commandFile.run(client, command, userMessage);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.DISCORD_TOKEN)
require("dotenv").config();

const { Client, Collection } = require('discord.js');
const client = new Client();
const fs = require("fs");
const prefix = process.env.DISCORD_BOT_PREFIX;

const newUsers = new Collection();
module.exports = newUsers;

//Listen commands folder
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

//Listen functions folder
fs.readdir(`${__dirname}/events/`, (error, files) => {
  if (error) return console.error;

  console.log(`[EVENT]`);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    try {
      client.on(eventName, event.bind(null, client));
      console.log(`[✓] ${eventName}`);
    } catch (error) {
      console.log(`[✗] ${eventName}`);
    }
  });
});

client.on("message", (message) => {
  if (message.content === "alert") {
    client.emit("guildMemberRemove", message.member);
  }
  if (message.content === "test") {
    client.emit("guildMemberAdd", message.member)
  }
});

client.on("ready", () => {
  console.log(`Logged in ${client.user.tag}`)
});

client.login(process.env.DISCORD_TOKEN)
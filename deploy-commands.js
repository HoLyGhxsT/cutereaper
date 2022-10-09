require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");

const commandset = [];
const commandFolders = readdirSync("./src/commands");
for (const folder of commandFolders) {
  const commandFiles = readdirSync(`./src/commands/${folder}`).filter((file) =>
    file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const command = require(`./src/commands/${folder}/${file}`);
    commandset.push(command.data.toJSON());
  }
}

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; //if present commands only sync in that guild
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commandset })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
console.log(commandset);

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");

module.exports = (client) => {
  client.cmdhandler = async () => {
    const commands = readdirSync("./src/commands");
    for (const folder of commands) {
      const commandFiles = readdirSync(`./src/commands/${folder}`).filter(
        (file) => file.endsWith(".js")
      );
      const { commands, commandSet } = client;
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandSet.push(command.data.toJSON());
        console.log(`\n${command.data.name} command has been loaded...\n`);
      }
    }

    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;
    const isDEV = process.env.ENV == 'Dev';
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    if (isDEV) {
      //loads discord commands on prefered guild/server mention in guildId
      try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: client.commandSet,
        });

        console.log("Successfully reloaded application (/) commands.\n");
      } catch (error) {
        console.error(error);
      }
    } else {
      //globally loads commands. Might take some time
      try {
        console.log("Started refreshing application (/) commands (Global).");

        await rest.put(Routes.applicationCommands(clientId), {
          body: client.commandSet,
        });

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    }
  };
};

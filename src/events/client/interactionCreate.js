module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) {
        interaction.reply({
          content: `**Wrong command?! , Maybe Typo?**`,
          ephemeral: true,
        });
        // return;
      } else {
        // else await command.execute(interaction, client);
        try {
          await command.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: `Error`,
            ephemeral: true,
          });
        }
      }
    }
  },
};

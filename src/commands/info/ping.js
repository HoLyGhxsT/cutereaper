const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pongs the ping"),
  async execute(interaction, client) {
    const msg = await interaction.reply({
      content: "Calculating Ping⏳",
      fetchReply: true,
    });
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      // .setThumbnail("https://i.imgur.com/yny2Ktc.gif")
      // .setThumbnail("https://media.giphy.com/media/l41lIvPtFdU3cLQjK/giphy.gif")
      .setThumbnail("https://media.giphy.com/media/xUOwFZU7zQwXzaWOgE/giphy.gif")
      .setDescription(
        `**❯ Bot Latency:** \`${Math.round(
          msg.createdTimestamp - interaction.createdTimestamp
        )} ms\`\n
        	**❯ API Latency:** \`${Math.round(client.ws.ping)} ms\``
      )
      .setTimestamp();
    await interaction.editReply({ content: `**Result⌛**`, embeds: [embed] });
  },
};

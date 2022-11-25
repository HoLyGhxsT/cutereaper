const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const superagent = require("superagent");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Shows Random Waifu pics"),
  async execute(interaction, client) {
    // const msg = await interaction.reply({
    //   content: "Wait a Sec⏳",
    //   fetchReply: true,
    // });
    try {
      superagent
        .get("https://api.waifu.pics/sfw/waifu")
        .end((err, response) => {
          const embed = new EmbedBuilder()
            .setTitle("Here's your Waifu")
            // .setDescription(interaction.author.toString())
            .setImage(response.body.url)
            .setColor(0xffff00)
            .setTimestamp();
          interaction.reply({embeds: [embed] });
        })
        // .catch((err) =>
        //   message.channel.send({
        //     embed: {
        //       color: config.embedcolor,
        //       description: "Something went wrong... :cry:",
        //     },
        //   })
        // );
    } catch (err) {
      console.log(err);
    }
  },
};

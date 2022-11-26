const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("makes a announcement as the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Message to announce")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("channel to send in to")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const args = interaction.options.getString("message");
    const channel = interaction.options.getChannel("channel");
    if (!interaction.guild) return; // Returns as there is no guild
    // var guild = interaction.guild.id;
    var userID = interaction.user.tag;
    // console.log(userID);
    try {
      const embed = new EmbedBuilder()
        .setTitle(":loudspeaker: Announcement")
        .setColor(0xffff00)
        .setDescription(args)
        // .setAuthor({name: userID, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp()
        .setFooter({
          text: userID,
          iconURL: interaction.user.displayAvatarURL(),
        });
      await channel.send({ embeds: [embed] });
      await interaction.reply({
        content: "<a:verified:855153636078649404> Message Sent Successfully",
      });
    } catch (err) {
      await interaction.reply({
        content: "Some Error Occured ",
        ephemeral: true,
      });
    }
  },
};

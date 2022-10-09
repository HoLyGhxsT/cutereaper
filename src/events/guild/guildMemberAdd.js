const { EmbedBuilder } = require("@discordjs/builders");
const {GuildMember} = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  
  execute(member) {
    const {user, guild} = member;
    const welcomeChannel = member.guild.channels.cache.get('849994742150594571');
    const welcomeMessage = `Welcome <@${member.id}> to **Oppai Geng**!`;
    
    const welcomeEmbed = new EmbedBuilder()
    .setTitle('**:partying_face: New member :partying_face: **')
    .setColor(0x4ea3f7)
    .setThumbnail('https://media.giphy.com/media/Ae7SI3LoPYj8Q/giphy.gif')
    .setDescription(welcomeMessage)
    .addFields(
      { name:'Total member count:', value: `${guild.memberCount}` }
    )
    .setTimestamp();

    // member.roles.add('1028593968528769064');
    welcomeChannel.send({embeds: [welcomeEmbed]});
    console.log(`${member.id} joined the guild.`)
  },
};
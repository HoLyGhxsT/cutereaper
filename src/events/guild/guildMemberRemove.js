const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember } = require("discord.js");


module.exports = {
  name: "guildMemberRemove",
  
  execute(member) {
    const {user, guild} = member;
    const memberLogs = member.guild.channels.cache.get('849994742150594571');
    const leaveMessage = `<@${member.id}> left! It was nice having you around.`;
    
    const leaveEmbed = new EmbedBuilder()
    .setTitle('**:x: Member Left :x: **')
    .setColor(0xf54242)
    .setDescription(leaveMessage)
    .addFields(
      { name:'Total member count:', value: `${guild.memberCount}` }
    )
    .setTimestamp();

    memberLogs.send({embeds: [leaveEmbed]});
    console.log(`${member.id} left the guild.`)
  },
};
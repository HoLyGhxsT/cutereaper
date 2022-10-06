const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Bot Online, Loggeds in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{ name: `Training 🧪`, type: ActivityType.Listening }],
      status: "dnd",
    });
  },
};

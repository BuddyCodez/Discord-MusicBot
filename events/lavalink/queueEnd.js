const { pannel } = require('../../helpers/functions.js');
const guildModel = require('../../models/guild.js');

module.exports = {
    run: async (client, player) => {
        const channel = client.channels.cache.get(player.textChannel);

        const msg = await channel.send({
            embeds: [{
                color: client.color.default,
                description: 'Music queue ended'
            }]
        });
        
        const guildData = await guildModel.findOne({ guildId: player.options.guild });
        client.channels.cache.get(guildData?.channelId).messages.fetch(guildData?.messageId).then(async (m) => {
            m.edit(await pannel(client));
        });

        setTimeout(() => {
            msg?.delete();
        }, 5 * 1000);

        player.pause(false);
        player.destroy();
    }
};
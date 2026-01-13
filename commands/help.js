import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all commands and required permissions'),

  permissionLevel: 'Everyone',

  async execute(interaction) {
    const commands = interaction.client.commands;

    const embed = new EmbedBuilder()
      .setTitle('Command Help')
      .setColor(0x5865F2)
      .setDescription('Here is a list of available commands:')
      .setFooter({ text: 'Permission levels are shown per command' });

    for (const command of commands.values()) {
      embed.addFields({
        name: `/${command.data.name}`,
        value: `${command.data.description}\n🔐 **Permission:** ${command.permissionLevel || 'Unknown'}`,
        inline: false
      });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};

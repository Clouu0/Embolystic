import { SlashCommandBuilder } from 'discord.js';
import { evaluate } from 'mathjs';

export default {
  data: new SlashCommandBuilder()
    .setName('calc')
    .setDescription('Evaluate a math expression')
    .addStringOption(option =>
      option.setName('expression')
        .setDescription('Example: 2*2, 6/3, sqrt(9)')
        .setRequired(true)),

  permissionLevel: 'Everyone',

  async execute(interaction) {
    const expr = interaction.options.getString('expression');

    try {
      const result = evaluate(expr);
      await interaction.reply(`**${expr}** = **${result}**`);
    } catch {
      await interaction.reply({
        content: 'Invalid math expression.',
        ephemeral: true
      });
    }
  }
};
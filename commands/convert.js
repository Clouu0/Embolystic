import { SlashCommandBuilder } from 'discord.js';

const conversions = {
  // length
  m: { ft: v => v * 3.28084 },
  ft: { m: v => v / 3.28084 },

  km: { mi: v => v * 0.621371 },
  mi: { km: v => v / 0.621371 },

  cm: { in: v => v * 0.393701 },
  in: { cm: v => v / 0.393701 },

  // weight
  kg: { lb: v => v * 2.20462 },
  lb: { kg: v => v / 2.20462 },

  g: { oz: v => v * 0.035274 },
  oz: { g: v => v / 0.035274 },

  // temperature
  c: { f: v => (v * 9/5) + 32 },
  f: { c: v => (v - 32) * 5/9 }
};

export default {
  data: new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert between metric and imperial units')
    .addNumberOption(option =>
      option.setName('value')
        .setDescription('Value to convert')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('from')
        .setDescription('Unit to convert from (e.g. km, mi, kg)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('to')
        .setDescription('Unit to convert to (e.g. mi, km, lb)')
        .setRequired(true)),
        permissionLevel: 'Everyone',
  async execute(interaction) {
    const value = interaction.options.getNumber('value');
    const from = interaction.options.getString('from').toLowerCase();
    const to = interaction.options.getString('to').toLowerCase();

    if (!conversions[from] || !conversions[from][to]) {
      return interaction.reply({
        content: `I can't convert **${from} → ${to}**.`,
        ephemeral: true
      });
    }

    const result = conversions[from][to](value);

    interaction.reply({
      content: `**${value} ${from}** = **${result.toFixed(2)} ${to}**`
    });
  }
};

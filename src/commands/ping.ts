import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/command";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("It responses with a pong to your ping")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to pong")
        .setRequired(false)
    ),
  run: async (interaction) => {
    await interaction.deferReply();
    // const { user } = interaction;
    const text = interaction.options.getString("message", false);
    if (text){
      await interaction.editReply(text);
    }
    else{
      await interaction.editReply('Pong!');
    }
  }
};
import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/command";
import { EmbedBuilder } from "discord.js"; 

export const avatar: Command = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Shows your avatar"),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    
    let avatar = user.avatarURL({ forceStatic: false, extension: "png", size: 1024});
    let messageEmbed = new EmbedBuilder() 
      .setColor(`#4cd8b2`) 
      .setTitle(`Avatar de ${user.username}`) 
      .setImage(avatar) 
      .setFooter({text: `• Autor: ${user.tag}`, iconURL: user.displayAvatarURL({extension: "png"})});
    
    interaction.editReply({ embeds: [messageEmbed] })
  }
};
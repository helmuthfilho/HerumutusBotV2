import { Client, Events } from "discord.js";
import { CommandList } from "../commands/_command_list";

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    for (const Command of CommandList){
      if(interaction.commandName == Command.data.name){
        try {
          await Command.run(interaction);
        } catch (error) {
          console.error(error);
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      }
    } 
  });
}
import { Client, Events } from "discord.js";

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command){
      console.error(`No command matching ${interaction.commandName} was found.`);
		  return;
    }
    try {
      await command.run(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });
}
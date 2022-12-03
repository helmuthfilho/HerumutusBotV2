import { Client, ActivityType, EmbedBuilder, ChannelType } from "discord.js";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest"
import cluster from "cluster";

export default (client: Client): void => {
  client.on("ready", async () => {
    if(!client.user || !client.application){
      return;
    }

    try {
      const rest = new REST({ version: "9" }).setToken(
        process.env.TOKEN as string
      );
  
      const commandData: {
        name: string;
        description?: string;
        type?: number;
        options?: APIApplicationCommandOption[];
      }[] = [];
      
      let commandList = Array.from(client.commands.values())
      commandList.forEach((command) =>
        commandData.push(
          command.data.toJSON() as {
            name: string;
            description?: string;
            type?: number;
            options?: APIApplicationCommandOption[];
          }
        )
      );

      const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle(`I'm back!`)
      .setAuthor({name: client.user.username, iconURL: 'https://www.iconsdb.com/icons/preview/guacamole-green/circle-xxl.png'})
      .setDescription(`Hey you! you're finally awake 🤨`)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(new Date())
      .setFooter({text: "© Herumutu's BOT Corporation"});
      
      for(var guild of client.guilds.cache.entries()){
        await rest.put(
          Routes.applicationGuildCommands(
            client.user?.id || "missing token",
            guild[0] as string
          ),
          { body: commandData }
        );
        for(var channel of guild[1].channels.cache.entries()){
          if(channel[1].type === ChannelType.GuildText){
            channel[1].send({ embeds: [embed] })
          }
        }
      }
    }
    catch (error) {
      console.log(error)
    }

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("My slash commands", {type: ActivityType.Watching});
  });
}
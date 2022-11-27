import { Client, ActivityType } from "discord.js";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest"

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
      await rest.put(
        Routes.applicationGuildCommands(
          client.user?.id || "missing token",
          process.env.GUILD_ID as string
        ),
        { body: commandData }
      );
    }
    catch (error) {
      console.log(error)
    }

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("💸 ₿itcoin's price 💸", {type: ActivityType.Watching});
  });
}
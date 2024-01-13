import axios from "axios";
import { EmbedBuilder } from "discord.js";
import { Command } from "../../Interfaces";
import { Response8ball } from "../../Interfaces/Nekoslife";

export const command: Command = {
  name: "8ball",
  description: "Test your luck",
  run: async (client, interaction) => {
    await interaction.deferReply();

    const response: Response8ball = (
      await axios.get("https://nekos.life/api/v2/8ball")
    ).data;

    const Embed = new EmbedBuilder()
      .setColor(client.env.BOT_COLOR)
      .setTitle(response.response)
      .setImage(response.url);

    return await interaction.followUp({ embeds: [Embed] });
  }
};

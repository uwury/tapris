import { Command } from "../../Interfaces";
import { DuckduckgoResponse } from "../../Interfaces/Duckduckgo";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const command: Command = {
	name: "search",
	description: "Get data from internet",
	options: [
		{
			name: "text",
			description: "Text to be searched",
			type: 3,
			required: true
		}
	],
	run: async (client, interaction) => {
		const text = interaction.options.getString("text");

		const response: DuckduckgoResponse = (
			await axios.get(
				`https://api.duckduckgo.com/?q=${encodeURI(text)}&format=json`
			)
		).data;

		if (!response.Results[0])
			return interaction.reply({
				content: "Can`t find results! :no_entry_sign:",
				ephemeral: true
			});

		const Embed = new EmbedBuilder()
			.setColor(client.env.BOT_COLOR)
			.setTitle(response.Results[0].FirstURL)
			.setURL(response.Results[0].FirstURL);

		return interaction.reply({ embeds: [Embed] });
	}
};

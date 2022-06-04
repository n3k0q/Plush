const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const math = require("mathjs");
const client = require('discord.js');
const prettyMilliseconds = require("pretty-ms");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stat')
		.setDescription('Info of bot.'),
	async execute(interaction, message, channel) {
		const embed = new MessageEmbed()
			.setTitle("⌚")
			.setColor("#303434")

		const embed2 = new MessageEmbed()
			.setTitle("О боже, я такой сусси..")
			.setColor("#303434")
			.addField("Аптайм ⌚", `${prettyMilliseconds(interaction.client.uptime)}`, true)
			.addField("Пинг ⏳", `${interaction.client.ws.ping}`)

		await interaction.reply({embeds: [embed]})22

		await wait(3000)

		await interaction.editReply({embeds: [embed2]})
	},
};

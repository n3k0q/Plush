const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const math = require("mathjs")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Информaция о сервере!'),
	async execute(interaction) {
		var serverIcon = interaction.guild.iconURL();
		const embed = new MessageEmbed()
		.setColor('#1111ff')
		.setTitle(`Server ${interaction.guild.name}`)
		.addField(`Created At`, `<t:${math.floor(interaction.guild.createdTimestamp/1000) + 3600}:d>`, true)
		.addField(`Owner`, `<@${interaction.guild.ownerId}>`)
		.setThumbnail(serverIcon)

	await interaction.reply({ embeds: [embed] })
	},
};
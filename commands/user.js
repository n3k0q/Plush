const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { Modal, TextInputComponent } = require('discord.js');
const math = require("mathjs")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Get user info!')
		.addUserOption(user => {
			return user
				.setName("user")
				.setDescription("pon")
				.setRequired(false)
		}),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		if (!user) {
			const embed = new MessageEmbed()
				.setTitle(`${interaction.member.user.tag}`)
				.addField(`Bot`, `${interaction.member.user.bot}`)
				.addField("Created at", `<t:${math.floor(interaction.member.user.createdTimestamp / 1000) + 3600}:d>`, true)
				.setThumbnail(interaction.member.user.avatarURL({dynamic: true}))
				await interaction.reply({ embeds: [embed] })
		} else	{		
			const embed = new MessageEmbed()
			.setTitle(`${user.username}`)
			.addField("Bot", `${user.bot}`)
			.addField("Created at", `<t:${math.floor(user.createdTimestamp / 1000) + 3600}:d>`, true)
			.setThumbnail(user.avatarURL({dynamic: true}))
			//.setFooter("thank!")
			await interaction.reply({ embeds: [embed] })
		}


	},
};
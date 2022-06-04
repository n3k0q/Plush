const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const client = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Clearing the chat")
		.addNumberOption(number => {
		return number 
			.setName("quantity")
			.setDescription("Количество сообщений. (лимит 100)")
			.setMinValue(1)
			.setMaxValue(10000)
			.setRequired(true)
		}),
	async execute(interaction, channel) {
		let clearQuantity = interaction.options.get('quantity')?.value;

		if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "Недостаточно прав для использования команды", ephemeral: true})

		if (clearQuantity > 100) {
			await interaction.channel.bulkDelete(100, true)
			clearQuantity = 100
		} else{
			await interaction.channel.bulkDelete(clearQuantity, true)
		}

		const embed = new MessageEmbed()
			.setTitle("Очистка")
			.setColor("#f5425d")
			.addField("Успешно очищено", `${clearQuantity} сообщений `, true)
			.setFooter(`${interaction.member.user.tag} использовал команду.`)

		await interaction.reply({ embeds: [embed], ephemeral: false})
				
		await wait(2500)
		
		await interaction.deleteReply()
	},
};
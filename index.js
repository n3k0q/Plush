const fs = require('node:fs');
const path = require('node:path');
const { Client, Intents } = require('discord.js');
const { Collection } = require('discord.js')
const { token } = require("./cfg.json")

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'К сожалению произошла ошибка когда мы пытались обработать команду!', ephemeral: true });
	}
});


client.once('ready', () => {
	console.log(`ok ${client.uptime}`);
	client.user.setActivity('пон', { type: 'WATCHING' });
	client.user.setStatus('idle');
});


client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.login(token)
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { configDotenv } from "dotenv";
import path from "path";
import fs from "fs";
import { CommandDefinition } from "./type";

configDotenv();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

const commands = new Collection<string, CommandDefinition>();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
        const commandModule = command.default || command;
		if ('data' in commandModule && 'execute' in commandModule) {
			commands.set(commandModule.data.name, commandModule);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {

	if(interaction.isButton()) {
		const id = interaction.customId;
		commands.forEach((value) => {
			if(value.buttons) {
				const button = value.buttons.filter((b) => b.id == id);
				if(button.length == 1) {
					button[0]?.handle(interaction);
				}
			}
		});
		return;
	}

	if(interaction.isModalSubmit()) {
		const id = interaction.customId;
		commands.forEach((value) => {
			if(value.modals) {
				const button = value.modals.filter((b) => b.id == id);
				if(button.length == 1) {
					button[0]?.handle(interaction);
				}
			}
		});
		return;
	}

	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN)
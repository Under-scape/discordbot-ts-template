import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandDefinition } from "../../type";

const cmd : CommandDefinition = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong again!'),
    async execute(interaction) {
        await interaction.reply('Pong !');
    }
}

export default cmd;
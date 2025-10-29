import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandDefinition } from "../../type";

const cmd : CommandDefinition = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong again!'),
    async execute(interaction : ChatInputCommandInteraction) {
        await interaction.reply('Pong !');
    }
}

export default cmd;
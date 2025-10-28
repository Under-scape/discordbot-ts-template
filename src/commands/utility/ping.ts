import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong again!'),
    async execute(interaction : ChatInputCommandInteraction) {
        await interaction.reply('Pong !');
    }
}
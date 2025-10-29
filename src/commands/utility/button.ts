import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, SlashCommandBuilder } from "discord.js";
import { CommandDefinition } from "../../type";

const cmd : CommandDefinition = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Demo button'),
    async execute(interaction) {

        const button = new ButtonBuilder()
            .setCustomId('test-button')
            .setLabel('Click me !')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(button);

        await interaction.reply({content: 'Oh one button !', components: [row]})
    },
    buttons: [
        {
            id: 'test-button',
            async handle(interaction) {
                await interaction.reply({content: 'Clicked !', flags: [MessageFlags.Ephemeral]});
            },
        }
    ]
}

export default cmd;
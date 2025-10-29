import { ButtonInteraction, ChatInputCommandInteraction } from "discord.js";

export type CommandDefinition = { data: SlashCommandBuilder, execute: (interaction: ChatInputCommandInteraction) => void, buttons?: { id: string, handle: (interaction: ButtonInteraction) => void}[]};
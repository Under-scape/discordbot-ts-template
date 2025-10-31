import { ButtonInteraction, ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from "discord.js";

export type CommandDefinition = { data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder, execute: (interaction: ChatInputCommandInteraction) => void, buttons?: { id: string, handle: (interaction: ButtonInteraction) => void}[]};
import path from "path";
import fs from "fs";
import { configDotenv } from "dotenv";
import { REST, Routes } from "discord.js";

configDotenv();

const commands: any[] = [];

const foldersPath = path.join(__dirname, 'commands');

if (!fs.existsSync(foldersPath)) {
    console.log('[ERROR] Commands directory not found at:', foldersPath);
    process.exit(1);
}

const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);

    if (!fs.statSync(commandsPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(commandsPath).filter(file => 
        file.endsWith('.js')
    );
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        try {
            const command = require(filePath);
            
            const commandModule = command.default || command;
            
            if ('data' in commandModule && 'execute' in commandModule) {
                commands.push(commandModule.data.toJSON());
                console.log(`[SUCCESS] Loaded command: ${commandModule.data.name}`);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        } catch (error) {
            console.log(`[ERROR] Failed to load command at ${filePath}:`, error);
        }
    }
}

if (!process.env.TOKEN) {
    console.error('[ERROR] TOKEN is not defined in environment variables');
    process.exit(1);
}

if (!process.env.CLIENT_ID) {
    console.error('[ERROR] CLIENT_ID is not defined in environment variables');
    process.exit(1);
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID as string),
            { body: commands },
        ) as any[];
        
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error('[ERROR] Failed to deploy commands:', error);
        process.exit(1);
    }
})();
# Discord Bot with TypeScript
A modern Discord bot template built with TypeScript for scalable and maintainable bot development.

## Features
- 🤖 Discord.js v14 framework
- 📘 TypeScript for type safety
- ⚡ Slash commands support
- 🛠️ Development tools configured
- 🔧 Environment configuration

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Discord Bot Token

## Installation
Clone this repository and install dependencies:
```bash
git clone https://github.com/Under-scape/discordbot-ts-template
cd discordbot-ts-template
npm install
```

## Configuration
1. Create a `.env` file in the root directory
2. Add your Discord bot token:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

## Available Scripts
### Development
```bash
npm run start
```
Start the bot.

### Build
```bash
npm run build
```
Compile TypeScript to JavaScript for production.

### Production
```bash
npm run start
```
Start the production bot (requires build first).

### Deploy Commands
```bash
npm run register
```
Deploy slash commands to Discord.

## Getting Started
1. Install dependencies: `npm install`
2. Configure your `.env` file with bot credentials
3. For start `npm run start`

## Scripts Workflow
For development:
```bash
npm run start
```
For production:
```bash
npm run start
```

---
**Note**: This template is based on community best practices and has been customized for Discord bot development.
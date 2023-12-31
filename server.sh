#!/bin/sh
cd /mnt/ssd/cl-discord-bot

rm -rf node_modules

rm -rf dist

git pull

npm install

npm install typescript

npm run build

npx prisma generate

pm2 start dist/index.js

    "@prisma/client": "^5.6.0",
    "discord.js": "^14.14.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "prisma": "^5.7.0",
    "tsc": "^2.0.4",
    "tsc-watch": "^6.0.4",
    "typescript": "^5.3.3"

        "@types/express": "^4.17.21",
    "@typescript-eslint/eslint-plugin": "^6.7.2",
    "@typescript-eslint/parser": "^6.7.2",
    "eslint": "^8.49.0"


        "deploy": "npm run env && npm run server",
    "all": "npm run devrm && npm run build && npm run start",
    "devrm": "rmdir /s /q dist",
    "build": "npx tsc",
    "start": "npx prisma generate && node dist/index.js",
    "env": "scp .env gimd8@192.168.0.7:/mnt/ssd/cl-discord-bot",
    "server": "ssh gimd8@192.168.0.7 \"sh /mnt/ssd/cl-discord-bot/server.sh\""
  
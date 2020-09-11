import {Client} from 'discord.js'

const config = require('../config.json')

const client = new Client()

client.on('message', msg => require('./handlers/commandHandler').default(msg))

client.on('ready', () => require('./handlers/ready').default(client))

client.login(config.token)

declare module 'discord.js' {
    interface Message {
        args: Array<string>
    }
}

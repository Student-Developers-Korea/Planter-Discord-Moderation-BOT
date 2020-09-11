import {Message} from 'discord.js'

const config = require('../../config.json')

export type Command = {
    name: string,
    aliases?: Array<string>,
    owner?: boolean,
    run(msg: Message) : Promise<void>
}

const cachedCommands : Array<Command> = [
    require('../commands/dev/eval').cmd,
    require('../commands/dev/reload').cmd
]

async function handleDM(msg: Message) {
    // TODO
}

export default async (msg: Message) : Promise<any> => {
    if (msg.author.bot) return
    if (!msg.guild) return handleDM(msg)
    const prefix = 'p!'
    if (!msg.content.startsWith(prefix)) return
    const args = msg.content.slice(prefix.length).split(/ +/g)
    const command = args.shift()!
    msg.args = args
    const cmd = cachedCommands.find(r => r.name === command || r.aliases?.includes(command))
    if (!cmd) return
    if (cmd.owner && !config.owners.includes(msg.author.id)) {
        return msg.reply('개발자용임')
    }
    await cmd.run(msg)
}

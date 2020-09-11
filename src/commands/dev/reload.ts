import {Command} from '../../handlers/commandHandler'

export const cmd : Command = {
    name: 'reload',
    aliases: ['rl'],
    owner: true,
    async run(msg): Promise<any> {
        Object.keys(require.cache).filter(r => !r.includes('node_modules')).forEach(r => delete require.cache[r])
        return msg.reply('끝')
    }
}
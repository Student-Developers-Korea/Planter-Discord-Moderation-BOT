import {Command} from '../../handlers/commandHandler'

export const cmd: Command = {
    name: 'eval',
    aliases: ['script'],
    owner: true,
    async run(msg): Promise<any> {
        const input = msg.args.join(' ').replace(/^```(js)?/, '')
            .replace(/```$/, '')
        return msg.reply(`${'```'}\n${
            await new Promise(resolve => resolve(eval(input))).then(r => require('util').inspect(r))
                .then(res => {
                    if (res.length > 1900) {
                        return res.slice(0, 1900) + '...'
                    } else {
                        return res
                    }
                })
        }`)
    }
}

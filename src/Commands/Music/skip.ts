import { play } from '../../Functions/music'
import { Command } from '../../Interfaces'

export const command: Command = {
	name: 'skip',
	description: 'Skip current music',
	aliases: [],
	run: async (client, message, args) => {
		global.queue.shift()
		global.connection.destroy()

		message.channel.send('Missed :musical_note:')

		return play(global.queue, message, client)
	}
}

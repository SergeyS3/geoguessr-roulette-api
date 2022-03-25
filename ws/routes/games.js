const GameModel = require('../../models/game')

let modelChangeStream

module.exports = async (ws, url) => {
	if(!modelChangeStream)
		modelChangeStream = GameModel.watch([], { fullDocument: 'updateLookup' })
	
	const send = data => ws.send(JSON.stringify(data))
	
	const login = url.search.substr(1)
					
	let game = await GameModel.findOne({ login })
	game && send(game)
	
	const onModelChange = ({ fullDocument }) => {
		if(login === fullDocument.login)
			send(fullDocument)
	}
	
	modelChangeStream.on('change', onModelChange)
	ws.on('close', () => modelChangeStream.off('change', onModelChange))
}

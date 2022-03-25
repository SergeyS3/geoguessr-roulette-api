const WebSocket = require('ws')
const { addPingLoop } = require('./tools')
const { connectDB } = require('../tools')

const gamesRoute = require('./routes/games')

const port = process.env.PORT || 3022

;(async () => {
	try {
		await connectDB()
		
		new WebSocket.Server({ port })
			.on('connection', async (ws, req) => {
				addPingLoop(ws)
				
				const url = new URL(req.url, `ws://${req.headers.host}/`)
				if(url.pathname === '/games')
					gamesRoute(ws, url)
			})
	} catch (e) {
		console.error(e.message)
	}
})()

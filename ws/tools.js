const addPingLoop = ws => {
	let unansweredPings = 0
	const pingInterval = setInterval(() => {
		if(unansweredPings > 2) {
			clearInterval(pingInterval)
			ws.close()
		}
		else {
			ws.ping()
			unansweredPings++
		}
	}, 5 * 60 * 1000)
	
	ws.on('pong', () => unansweredPings = 0)
}

module.exports = { addPingLoop }

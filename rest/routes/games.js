const GameModel = require('../../models/game')
const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')

router.get('/:login', async (req, res) => {
	try {
		const { login } = req.params
		let game = await GameModel.findOne({ login })
		
		if(!game) {
			game = new GameModel({
				login,
				settings: { timer: 90 },
				actions: { streak: 0 },
				players: { list: [] }
			})
			game.save()
		}
		
		res.json(game)
	} catch (e) {
		console.error(e)
	}
})

router.put('/:login', auth, async (req, res) => {
	try {
		const updatedAnswer = await GameModel.findOneAndUpdate({ login: req.params.login }, req.body)
		
		res.json(updatedAnswer)
	} catch (e) {
		console.error(e)
		res.status(422).json({ message: 'put error' })
	}
})

module.exports = router

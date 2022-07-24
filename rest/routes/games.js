const GameModel = require('../../models/game')
const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')

router.get('/:login', async (req, res) => {
	const { login } = req.params
	try {
		let game = await GameModel.findOne({ login })
		if(game)
			res.json(game)
		else
			res.status(404).json({ message: 'Not found' })
	} catch (e) {
		console.error(e)
	}
})

router.post('/', auth, async (req, res) => {
	const newGame = new GameModel({ ...req.body })
	try {
		await newGame.save()
		res.status(201).json(newGame)
	} catch (e) {
		console.error(e)
		res.status(422).json({ message: 'Add error' })
	}
})

router.put('/:login', auth, async (req, res) => {
	try {
		const updatedAnswer = await GameModel.findOneAndUpdate({ login: req.params.login }, req.body)
		res.json(updatedAnswer)
	} catch (e) {
		console.error(e)
		res.status(422).json({ message: 'Update error' })
	}
})

module.exports = router

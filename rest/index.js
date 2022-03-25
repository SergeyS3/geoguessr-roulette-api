const express = require('express')
const path = require('path')
const { connectDB } = require('../tools')

const errorHandler = require('./middleware/error')

const gamesRoutes = require('./routes/games')

const port = process.env.PORT || 3021

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/games', gamesRoutes)

app.use(errorHandler)

;(async () => {
	try {
		await connectDB()
		
		app.listen(port)
	} catch (e) {
		console.error(e)
	}
})()

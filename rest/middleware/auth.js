const { btoa } = require('../../tools')
const keys = require('../../data/keys')

module.exports = (req, res, next) => {
	const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
	const [login, password] = btoa(b64auth).split(':')
	
	if(login === req.params.login && password === keys.api.pass)
		return next()
	
	res.status(401).send('401 Unauthorized')
}

const db = require('mongoose')

const config = require('./config')

// db.set('strictQuery', false)

exports.connect = () => {
	db.connect(config.mongouri,{ useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.log(`Database connected @ ${process.pid}`)
		})
		.catch((error) => {
			console.log(error)
		})
}

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const config = require('../../config')

const login = async (reqBody, userModel) => {
	try {
		const { email, password } = reqBody
		const user = await userModel.findOne({ email })

		if (user) {
			if (await bcrypt.compare(password, user.password)) {
				const token = jwt.sign(email, config.tokenSecret)
				return { user: user, token: token }
			} else {
				return { error: true, message: 'Invalid credentials provided' }
			}
		} else {
			return { error: true, message: 'No user found' }
		}
	} catch (err) {
		console.log('loginServiceError', err)
		return {
			error: true,
			message: 'Server not responding, please try again later',
		}
	}
}

const register = async (reqBody, userModel) => {
	try {
		const { name, email, password } = reqBody
		const user = await userModel.findOne({ email })

		if (!user) {
			const encryptedPassword = await bcrypt.hash(password, 10)
			const user = await userModel.create({
				name,
				email,
				password: encryptedPassword,
			})
			const token = jwt.sign(email, config.tokenSecret)

			return { user: user, token: token }
		} else {
			return { error: true, message: 'User already exists' }
		}
	} catch (err) {
		console.log('registerServiceError', err)
		return {
			error: true,
			message: 'Server not responding, please try again later',
		}
	}
}

module.exports = {
	login,
	register,
}

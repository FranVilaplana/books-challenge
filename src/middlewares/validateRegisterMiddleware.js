const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('email')
		.notEmpty().withMessage('Tenes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tenes que escribir una contraseña'),
	body('country').notEmpty().withMessage('Tenes que elegir un país'),
	body('category').notEmpty().withMessage('Tenes que elegir una categoria'),
]
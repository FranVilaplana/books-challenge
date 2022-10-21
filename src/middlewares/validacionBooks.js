const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('title').notEmpty().withMessage('Tienes que escribir un titulo'),
	body('cover').notEmpty().withMessage('Tenes que escribir un cover'),
	body('description').notEmpty().withMessage('Tenes que elegir una descricion'),
	
]
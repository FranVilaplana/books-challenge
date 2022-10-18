const path = require('path');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports.validar = (method) => {
    switch(method){
        case 'register': {
            return [
                body('name')
                .notEmpty().withMessage('El campo nombre no puede estar vacío')
                .isLength({min: 2}).withMessage('Mìnimo 2 caracteres'),
                
                body('email')
                .notEmpty().withMessage('completar dirección de correo electrónico')
                .isEmail().withMessage('Agregar un email válido')
                .custom( async (value, {req}) => {    
                    await db.User.findOne({ where: {email: req.body.email }}).then(user => {
                        if (user)
                        throw new Error('El correo ya existe. Debes elegir otro');
                });
                }),
                body('pass')
                .notEmpty().withMessage('la contraseña no puede estar vacía') 
                .isLength({min:8}).withMessage('la contraseña debe tener al menos 8 caracteres'),      
                
                body('country')
                .notEmpty().withMessage('El campo country no puede estar vacío')  
            ]
        }
        case 'login': {
            return [
                body ('email').isEmail().withMessage('Agregar un email válido'),
                
                body('pass').isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
                
                body('email').custom( (value  ) =>{
                    db.User.findOne({where:{email :value}})
                    .then(result=>{
                        if(result){
                        return true
                        }
                        return false
                    })
                }).withMessage('Usuario no se encuentra registrado...')
                ]
        }
    }

}
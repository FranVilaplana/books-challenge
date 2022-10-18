const { body } = require("express-validator");
const fs = require("fs");

module.exports = [
    body("title")
        .notEmpty().withMessage("El nombre no puede estar vacio!")
        .isLength({min:2, max:40}).withMessage("El nombre debe tener entre 5 y 40 caracteres"),
    body("description")
        .notEmpty().withMessage("La descripcion no puede estar vacia!")
        .isLength({min: 20}).withMessage("La descripcion debe tener minimo 20 caracteres"),
    
]
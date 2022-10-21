const fs = require('fs');
const path = require('path');
const db = require('../database/models');

module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )

    res.locals.userLogged = false;
    res.locals.userType = false;
    if(req.session.userLogged){
        res.locals.userLogged = req.session.userLogged;
        if (req.session.userLogged.CategoryId == 1){
            res.locals.userType = true
        }
        return next();
    }else if(req.cookies.email){
        db.User.findOne({where: {email: req.cookies.email}})
        //return res.send(usuario);
        .then((usuario) => {
            delete usuario.password;
            req.session.userLogged = usuario;
            res.locals.userLogged = usuario;
            if (req.session.userLogged.CategoryId == 1){
                res.locals.userType = true
            }
        })
    }
    return next();

}
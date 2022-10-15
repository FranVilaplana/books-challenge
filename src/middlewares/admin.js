const fs = require('fs');
const path = require('path');
const db = require('../database/models');
module.exports = (req,res,next) =>{
    res.locals.usuarioLogueado = false;
    res.locals.userType = false;
    if(req.session.usuarioLogueado){
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        if (req.session.usuarioLogueado.id_usercategory == 1){
            res.locals.userType = true
        }
        return next();
    }else if(req.cookies.userEmail){
        db.User.findOne({where: {email: req.cookies.userEmail}})
        .then((usuario) => {
            delete usuario.password;
            req.session.usuarioLogueado = usuario;
            res.locals.usuarioLogueado = usuario;
            if (req.session.usuarioLogueado.id_usercategory == 1){
                res.locals.userType = true
            }return next();
        })} else{
        return res.redirect("/accesodenegado");
    };
    

}
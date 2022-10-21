const db = require('../database/models');

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	if (req.session.userLogged) {

				res.locals.isLogged = true;
				res.locals.userLogged = req.session.userLogged;
			}
	let emailInCookie = req.cookies.userEmail;
	if(emailInCookie){

	db.User.findOne({ where: { email: emailInCookie } })
	.then((userFromCookie) => { 
		
		if (userFromCookie) {
			req.session.userLogged = userFromCookie;
			res.locals.isLogged = true;
			res.locals.userLogged = req.session.userLogged;
	
	}
	next();
	})}else{
	next();
	}
	
}

module.exports = userLoggedMiddleware;
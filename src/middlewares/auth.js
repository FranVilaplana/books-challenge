function authMiddleware(req, res, next) {
	if (req.session.usuarioLogueado) {
        next()
	} else {
        res.render("users/login");
    }

}

module.exports = authMiddleware;
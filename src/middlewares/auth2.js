function authMiddleware(req, res, next) {
	if (req.session.usuarioLogueado) {
        next()
	} else {
        res.render("users/register");
    }

}

module.exports = authMiddleware;
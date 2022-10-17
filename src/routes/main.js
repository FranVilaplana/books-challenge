const express = require('express');
const mainController = require('../controllers/main');
const guestMiddleware = require('../middlewares/admin');
const router = express.Router();
const validaciones = require("../middlewares/validaciones");

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register',mainController.register);
router.post('/users/register', validaciones.validar('register') ,mainController.processRegister);
router.get('/users/login',mainController.login);
router.post('/users/login', validaciones.validar('login') ,mainController.processLogin);
router.delete('/books/:id', guestMiddleware ,mainController.deleteBook);
router.get('/books/edit/:id', guestMiddleware ,mainController.edit);
router.put('/books/edit/:id', mainController.processEdit);
router.get('/users/logout', mainController.logout);

module.exports = router;

const express = require('express');
const mainController = require('../controllers/main');
const router = express.Router();
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const bookMiddleware = require('../middlewares/validacionBooks');


router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);

router.get('/users/register', guestMiddleware, mainController.register);
router.post('/users/register', validations, mainController.processRegister);

router.get('/users/login', guestMiddleware, mainController.login);
router.post('/users/login',mainController.processLogin);

router.get('/users/logout', mainController.logout);
router.delete('/books/:id', mainController.deleteBook);

router.get('/books/edit/:id',  mainController.edit);
router.put('/books/edit/:id', bookMiddleware, mainController.processEdit);

module.exports = router;
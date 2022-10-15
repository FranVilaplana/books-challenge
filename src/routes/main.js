const express = require('express');
const mainController = require('../controllers/main');
const guestMiddleware = require('../middlewares/admin');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const auth2Middleware = require('../middlewares/auth2');

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register', auth2Middleware ,mainController.register);
router.post('/users/register', mainController.processRegister);
router.get('/users/login', authMiddleware ,mainController.login);
router.post('/users/login', mainController.processLogin);
router.delete('/books/:id', guestMiddleware ,mainController.deleteBook);
router.get('/books/edit/:id', guestMiddleware ,mainController.edit);
router.put('/books/edit/:id', mainController.processEdit);
router.get('/users/logout', mainController.logout);

module.exports = router;

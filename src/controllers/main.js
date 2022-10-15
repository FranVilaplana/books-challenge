const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    let libro =  db.Book.findByPk(req.params.id, {
      include: [{ association: 'authors' }]
    })
      .then((libro) => {
            res.render('bookDetail',{libro});
      }); 
    },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    res.render('search');
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    res.render('authorBooks');
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
		let libroeditar = db.Book.findByPk(req.params.id)
			.then((libroeditar) => {
				return res.render('editBook', { libroeditar })
			})
			.catch(error => res.send(error))
	},
  processEdit: (req, res) => {
    let libroeditar = db.Book.findByPk(req.params.id)
      .then((libroeditar) => {
        let books = {
          title: req.body.title,
          cover: req.body.cover,
          description: req.body.description
        }
        db.Book.update(books, { where: { id: req.params.id } })
          .then(() => {
          return res.render ('home')
      })
    })
  },
  deleteBook: (req, res) => {
    db.Book.destroy({where:{ id: req.params.id }})
      .then (() => {
        res.redirect('home');
      })
      .catch(error => res.send(error))
  },
};

module.exports = mainController;

const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { validationResult } = require('express-validator');


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
    db.Book.findByPk (req.params.id,{include: [{ association: 'authors' }]}
      )
        .then(book => {
          res.render('bookDetail', {book}
          );
        });
  },
  bookSearch: (req, res) => {
    db.Book.findAll()
    .then ((books)=>{
    res.render('search', {books});
  })
  },
  bookSearchResult: (req, res) => {
    db.Book.findOne ({where: { title: req.body.title }}
      )

        .then(books => { 
          if (books != undefined) {
          res.render ('search', {books}
          );
        } else {
          res.redirect ("search")
        }
        });
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    db.Author.findByPk(req.params.id, {
      include: [{ association: 'books' }]
    })
  
      .then((autor)  => {	
        res.render('authorBooks', {autor} )
      })
  },

  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = db.User.findOne({where: { email: req.body.email }})


		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
		}

		//let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
	},
  login: (req, res) => {
    return res.render('login');
  },
  processLogin: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
  edit: (req, res) => {
      db.Book.findByPk(req.params.id)
      .then((books) =>{
      return res.render('editBook', {books})
    })
    
  },
  logout: (req, res) => {
    res.clearCookie('email');
    req.session.destroy();
    return res.render("/");
  },
  processEdit: (req, res) => {
    const resultValidation = validationResult(req);
    let bookToEdit=db.Book.findByPk(req.params.id)
    Promise
    .all([bookToEdit])
    .then((bookToEdit)=> {
      if (resultValidation.errors.length>0) {
        res.render ('editBook', {bookToEdit, errors: resultValidation.mapped()})
      console.log(resultValidation)
    } else {
      let books = {
        title: req.body.title,
        cover: req.body.cover,
        description: req.body.description, 
      }
      db.Book.update(books, { where: { id: req.params.id } })	
				.then(() => {
					return res.redirect('/')
					})		
        }		
			})
  },
  deleteBook: (req, res) => {
    db.Book.update({estado :1 },{ where: { id: req.params.id }, force: true }) // force: true es para asegurar que se ejecute la acción
      .then(() => {
        return res.redirect('/')
      })
      .catch(error => res.send(error))
  },
};

module.exports = mainController;

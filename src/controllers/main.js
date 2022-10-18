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
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    res.render('search');
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
      include: [{ association: 'books' }] // salen los libros duplicados
    })
  
      .then((autor)  => {	
        res.render('authorBooks', {autor} )
      })
  },

  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 8),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    return res.render('login');
  },
  processLogin: (req, res) => {
    db.User.findOne({where: { email: req.body.email }})
    .then((usuario) => {
      if (usuario) {
        let passOk = bcryptjs.compareSync(req.body.password, usuario.password)
        if (passOk) {
          delete usuario.password 
          req.session.usuarioLogueado = usuario
          res.cookie("userEmail", req.body.email, { maxAge: 300 * 60 * 60 })
          res.redirect('home');
        } else {
          return res.render("login", {
            errors: {
              datosMal: {
                msg: "Las credenciales son inválidas"
              }
            }
          })
        }
      } else {
        return res.render("login", {
          errors: {
            datosMal: {
              msg: "Las credenciales son inválidas"
            }
          }
        })
      }
    })
  },
  edit: (req, res) => {
      db.Book.findByPk(req.params.id)
      .then((books) =>{
      return res.render('editBook', {books})
    })
    
  },
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.render("home");
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
    db.Book.findByPk(req.params.id)
      .then (()=>
    db.Book.destroy({ where: { id:req.params.id }, force: true }) // te sale como que no se puede eliminar pq es una FK
      .then(() => {
        return res.redirect('/')
      })
      )
      .catch(error => res.send(error))
  },
};

module.exports = mainController;

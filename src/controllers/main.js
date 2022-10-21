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
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }
    db.User.findOne({ where: { email: req.body.email } })
    .then((userInDB) => {   
      if(userInDB == req.body.email){ 	
        console.log('valida usuario ya registrado')
        return res.render("register", {
        errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          oldData: req.body
        });
      }
    })
      console.log('entra a Create')
      db.User
          .create(
            {
              Name: req.body.name,
              Email: req.body.email,
              Country: req.body.country,
              Pass: bcryptjs.hashSync(req.body.password, 10),
              CategoryId: req.body.category
            }
      )
      .then(()=> {
        return res.render('login')})
      .catch(error => res.send(error))
},
  login: (req, res) => {
    return res.render('login');
  },
  processLogin: (req, res) => {
    db.User.findOne({
      where: {email: req.body.email}
    }).then((usuario)=>{
      if (usuario){
        let passOk = bcryptjs.compareSync(req.body.password,usuario.Pass)
        console.log(passOk)
        console.log(usuario)
        if(passOk){
          req.session.usuarioLogueado = usuario
          delete usuario.password
          res.cookie("userEmail",req.body.email,{maxAge: 300 * 60 * 60})
          res.redirect("/");
        
        }else{
          return res.render("login",{
            errors: {
              datosIncorrectos: {
                msg: "LAS CREDENCIALES SON INVÁLIDAS"
              }
            }
          })
        }
      }else{
        return res.render("login", {
          errors: {
            datosIncorrectos: {
              msg: "LAS CREDENCIALES SON INVÁLIDAS"
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

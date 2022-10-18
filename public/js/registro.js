window.addEventListener("load", function(){

    let form = document.querySelector(".form");
    //form.name.focus();

    form.addEventListener("submit", function (e) {
        
        let errors = [];
        let name = document.querySelector('#name');
        let country = document.querySelector('#country');
        let password = document.querySelector('#password');
        let email = document.querySelector('#email');

        /// VALIDACION Nombre
        if (name.value.length < 2 ) {
            errors.push('El campo nombre no puede tener menos de 2 caracteres!');
            name.classList.add('is-invalid');
        }
        else{
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
        }

        /// VALIDACION Country
        if (country.value.length < 2 ) {
            errors.push('El campo apellido no puede tener menos de 2 caracteres!');
            country.classList.add('is-invalid');
        }
        else{
            country.classList.add('is-valid');
            country.classList.remove('is-invalid');
        }

        /// VALIDACION Email
        if (!regexEmail.test(email.value)){
            errors.push('El email no cumple no tiene el formato correcto');
            email.classList.add('is-invalid');
        } 
        else{
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
        }
        
        /// VALIDACION password
        if (password.value.length < 8 ) {
            errors.push('El campo pasword debe tener al menos 8 caracteres!');
            password.classList.add('is-invalid');
        }
        else{
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
        }

        if (errors.length > 0) {
            
            Swal.fire({
                icon: 'error',  
                text: 'Revise los errores!',
            })
                    let ulErrors = document.querySelector('.errores');
            ulErrors.classList.add('alert-warning')
            ulErrors.innerHTML = ''
            
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li > ${errors[i]} </li>`
            }
        }
        else{
            Swal.fire({
                icon: 'success',
                text: 'Cambios realizados!',
            })
            .then( ()=> {
                form.submit()
            })
        }
        
    }
)})
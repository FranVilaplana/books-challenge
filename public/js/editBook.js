window.addEventListener("load", function(){

    let form = document.querySelector(".form");
    //form.name.focus();

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let errors = [];
        let name = document.querySelector('#title');
        let description = document.querySelector('#description');

        /// VALIDACION Nombre
        if (title.value.length < 2 ) {
            errors.push('El campo nombre no puede tener menos de dos caracteres!');
            name.classList.add('is-invalid');
        }
        else{
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
        }


        //VALIDACION description
        if (description.value.length < 20 ) {
            errors.push('El campo descripcion no puede tener menos de 20 caracteres!');
            description.classList.add('is-invalid');
        }
        else{
            description.classList.add('is-valid');
            description.classList.remove('is-invalid');
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
function askForName() {
    let userName;

    do{
        userName = prompt("Por favor, ingresa tu nombre (mínimo 3 letras):");

        if(userName.length<3){
            Swal.fire({
                icon: 'warning',
                title: 'Ingrese un minimo de 3 letras',
                text: 'Ingrese un minimo de 3 letras',
                confirmButtonText: 'Aceptar'
            });
        }
    }while (userName.length < 3);


}

askForName();
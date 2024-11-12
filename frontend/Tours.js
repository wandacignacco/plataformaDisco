function askForName() {
    let userName;

    do {
        userName = prompt("Por favor, ingresa tu nombre (mínimo 3 letras):");

        if (userName && userName.length < 3) {
            Swal.fire({
                icon: 'warning',
                title: 'Ingrese un mínimo de 3 letras',
                text: 'Ingrese un mínimo de 3 letras',
                confirmButtonText: 'Aceptar'
            });
        }
    } while (!userName || userName.length < 3);

    // Mensaje final con el nombre ingresado
    Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: `Hola, ${userName}!`,
        confirmButtonText: 'Aceptar'
    });
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', askForName);
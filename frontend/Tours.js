async function askForName() {
    let userName;

    // Ciclo para seguir pidiendo el nombre hasta que sea válido
    while (true) {
        userName = prompt("Por favor, ingresa tu nombre");

        // Verifica si el nombre es válido
        if (userName && userName.length >= 3) {
            // Si el nombre es válido, muestra el mensaje de bienvenida
            await Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: `Hola, ${userName}!`,
                confirmButtonText: 'Aceptar'
            });
            return userName; // Retorna el nombre para usarlo después
        } else {
            // Si el nombre es demasiado corto o está vacío, muestra el mensaje de advertencia
            await Swal.fire({
                icon: 'warning',
                title: 'Nombre demasiado corto',
                text: 'Ingrese un mínimo de 3 letras',
                confirmButtonText: 'Aceptar'
            });
        }
    }
}

async function pedirEdad() {
    let edad;

    // Ciclo para pedir la edad hasta que sea válida
    while (true) {
        edad = prompt("Por favor, ingresa tu edad:");

        // Verifica si la edad no fue ingresada o está vacía
        if (edad === null || edad.trim() === "") {
            await Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'Debe completar su edad.',
                confirmButtonText: 'Aceptar'
            });
        }
        // Verifica si la edad no es un número o es menor o igual a 0
        else if (isNaN(edad) || parseInt(edad.trim()) <= 0) {
            await Swal.fire({
                icon: 'warning',
                title: 'Edad inválida',
                text: 'Por favor, ingresa una edad válida.',
                confirmButtonText: 'Aceptar'
            });
        } else {
            // Convierte la entrada a un número entero y la retorna si es válida
            return parseInt(edad.trim());
        }
    }
}


async function verificarEdad(edad) {
    // Verifica si la edad es menor a 18
    if (edad < 18) {
        // Si la edad es menor a 18, muestra el mensaje y bloquea la compra de tickets
        await Swal.fire({
            icon: 'error',
            title: 'Acceso restringido',
            text: 'Lo sentimos, debes tener al menos 18 años para comprar boletos.',
            confirmButtonText: 'Aceptar'
        });
        // Bloquea la compra
    

    } else {
        // Si la edad es válida (18 o más), se puede continuar
        await Swal.fire({
            icon: 'success',
            title: 'Acceso permitido',
            text: 'Puedes proceder con la compra de boletos.',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Llama a las funciones en secuencia al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    const nombreUsuario = await askForName();  // Espera la respuesta del nombre
    const edadUsuario = await pedirEdad();    // Luego espera la respuesta de la edad

    // Verifica si la edad es válida y mayor de 18
    if (edadUsuario >= 18) {
        // Si la edad es mayor o igual a 18, permite la compra de tickets
        await Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `¡Hola, ${nombreUsuario}! Tienes ${edadUsuario} años. ¡Disfruta de nuestros próximos shows!`,
            confirmButtonText: 'Aceptar'
        });
    } else {
        // Si la edad es menor a 18, bloquea la compra de tickets
        await verificarEdad(edadUsuario);
        disableTicketButtons();
    }
});

function disableTicketButtons() {
    const buttons = document.querySelectorAll('.buy-ticket');
    buttons.forEach(button => {
        button.disabled = true;
        button.textContent = "Acceso Restringido";  // Cambia el texto para indicar que no se puede comprar
        button.classList.add('bg-gray-500'); // Cambia el color para mostrar que el botón está deshabilitado

        button.addEventListener('click', (event) => {
            event.preventDefault();  // Detiene la acción por defecto (evita la compra)
            Swal.fire({
                title: 'Acceso restringido',
                text: 'Lo sentimos, debes tener al menos 18 años para comprar boletos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }
            )})
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Vincula el evento click a los botones "Adquirir Tickets"
    document.querySelectorAll('.buy-ticket').forEach(button => {
        button.addEventListener('click', (event) => {
            const place = event.target.getAttribute('data-place');
            console.log(`Se hizo clic para comprar tickets en: ${place}`);  // Esto es solo para verificar
            getTickets(place);  // Llama a la función para manejar la compra
        });
    });
});

// Definir la cantidad de tickets disponibles por lugar
let tickets = {
    "Argentina": 5,
    "Brasil": 3,
    "Chile": 2,
    "México": 4
};

// Función para manejar la compra de tickets
window.getTickets = function(place) {
    if (tickets.hasOwnProperty(place)) {
        if (tickets[place] > 0) {
            // Confirmar la compra
            Swal.fire({
                title: 'Confirmar Compra',
                text: `¿Deseas comprar un ticket para el show en ${place}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, comprar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Disminuir el número de tickets
                    tickets[place]--;

                    // Mostrar alerta de éxito
                    Swal.fire({
                        title: '¡Compra Exitosa!',
                        text: `Has comprado un ticket para ${place}.`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    // Deshabilitar el botón si los tickets se han agotado
                    if (tickets[place] === 0) {
                        disableSoldOutButtons();
                    }
                }
            });
        } else {
            // Mostrar alerta de tickets agotados
            Swal.fire({
                title: 'Tickets Agotados',
                text: `Lo sentimos, ya no hay tickets disponibles para el show en ${place}.`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    } else {
        // Mostrar alerta de error si el lugar no existe en el objeto
        Swal.fire({
            title: 'Error',
            text: 'El lugar seleccionado no existe.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Deshabilitar los botones de los tickets agotados
function disableSoldOutButtons() {
    // Buscar los botones que tienen la clase "buy-ticket" y el lugar correspondiente
    const buttons = document.querySelectorAll('.buy-ticket');
    buttons.forEach(button => {
        const place = button.getAttribute('data-place');
        if (tickets[place] === 0) {
            button.disabled = true;
            button.textContent = "Agotado";
            button.classList.add('bg-gray-500'); // Cambiar color para indicar que está agotado
        }
    });
}

// Escuchar los clics en los botones para comprar tickets
document.querySelectorAll('.buy-ticket').forEach(button => {
    button.addEventListener('click', (event) => {
        const place = event.target.getAttribute('data-place');
        getTickets(place);
    });
});

// Llamar a disableSoldOutButtons al cargar la página para deshabilitar los botones agotados
document.addEventListener('DOMContentLoaded', disableSoldOutButtons);
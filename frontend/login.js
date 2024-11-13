document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form[action="login"]');
    const passwordInput = document.querySelector('input[name="contraseña"]');
    const emailInput = document.querySelector('input[name="correo electrónico"]');
    
    // Crear la leyenda para la longitud de la contraseña
    const warningMessage = document.createElement("span");
    warningMessage.textContent = "Tu respuesta es demasiado corta";
    warningMessage.style.color = "red";
    warningMessage.style.display = "none";
    passwordInput.parentNode.appendChild(warningMessage);

    // Evento para mostrar la advertencia si la contraseña es demasiado corta
    passwordInput.addEventListener("input", () => {
        if (passwordInput.value.length < 6) {
            warningMessage.style.display = "block";
        } else {
            warningMessage.style.display = "none";
        }
    });

    // Evento de envío del formulario
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el envío hasta que se validen los campos

        // Validar que los campos no estén vacíos
        if (!emailInput.value || !passwordInput.value) {
            await Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Debes completar todos los campos para iniciar sesión.',
                confirmButtonText: 'Aceptar'
            });
        } else if (passwordInput.value.length < 6) {
            // Mostrar advertencia adicional si la contraseña es demasiado corta
            await Swal.fire({
                icon: 'error',
                title: 'Contraseña muy corta',
                text: 'La contraseña debe tener al menos 6 caracteres.',
                confirmButtonText: 'Aceptar'
            });
        } else {
            // Si todos los campos son válidos, enviar el formulario
            form.submit();
        }
    });
});
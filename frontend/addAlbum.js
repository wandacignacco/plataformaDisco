async function validateAddAlbumForm(event) {
    event.preventDefault(); // Evita el envío del formulario hasta que se validen los campos

    let isValid = true;
    let errorMessage = "";

    // Obtener los valores de los campos usando los id correctos
    const albumTitle = document.getElementById('album').value;
    const albumYear = document.getElementById('anio').value;
    const albumDescription = document.getElementById('descripcion').value;
    const albumImageUrl = document.getElementById('imagen').value;

    // Validación del título del álbum
    if (albumTitle.length < 3) {
        isValid = false;
        errorMessage += "El título del álbum debe tener al menos 3 caracteres.\n";
    }

    // Validación del año de lanzamiento
    const currentYear = new Date().getFullYear();
    if (albumYear < 1900 || albumYear > currentYear) {
        isValid = false;
        errorMessage += "Ingrese un año válido (entre 1900 y el año actual).\n";
    }

    // Validación de la descripción
    if (albumDescription.length < 10) {
        isValid = false;
        errorMessage += "La descripción debe tener al menos 10 caracteres.\n";
    }

    // Validación de URL de la imagen
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(albumImageUrl)) {
        isValid = false;
        errorMessage += "Ingrese una URL válida de imagen (jpg, jpeg, png, gif).\n";
    }

    if (isValid) {
        await Swal.fire({
            icon: 'success',
            title: 'Validación exitosa',
            text: 'Todos los datos son correctos. Se procederá a enviar el formulario.',
            confirmButtonText: 'Aceptar'
        });
        // Enviar el formulario si la validación es exitosa
        event.target.submit();
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Error en la validación',
            text: errorMessage,
            confirmButtonText: 'Aceptar'
        });
    }
}

// Añadir un escuchador de eventos para el formulario
document.getElementById('addAlbumForm').addEventListener('submit', validateAddAlbumForm);
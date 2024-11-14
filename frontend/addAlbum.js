// Evento para validar y enviar el formulario sin recargar la página
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

    // Si la validación es exitosa, enviar los datos al backend
    if (isValid) {
        await Swal.fire({
            icon: 'success',
            title: 'Validación exitosa',
            text: 'Todos los datos son correctos. Se procederá a enviar el formulario.',
            confirmButtonText: 'Aceptar'
        });

        // Crear un objeto con los datos del formulario
        const albumData = {
            album: albumTitle,
            Año: albumYear,
            descripcion: albumDescription,
            imagen: albumImageUrl
        };

        // Enviar los datos al backend usando fetch
        try {
            const response = await fetch('/albums', {
                method: 'POST', // Usamos el método POST
                headers: {
                    'Content-Type': 'application/json', // Enviamos datos en formato JSON
                },
                body: JSON.stringify(albumData), // Convertimos el objeto a JSON
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al agregar el álbum');
            }

            // Mostrar una alerta de éxito si el álbum se guarda correctamente
            await Swal.fire({
                icon: 'success',
                title: 'Álbum Agregado',
                text: 'El álbum ha sido agregado correctamente.',
                confirmButtonText: 'Aceptar'
            });

            // Limpiar el formulario
            document.getElementById('addAlbumForm').reset();
        } catch (error) {
            // Mostrar un mensaje de error si algo falla
            await Swal.fire({
                icon: 'error',
                title: 'Error al agregar el álbum',
                text: error.message,
                confirmButtonText: 'Aceptar'
            });
        }
    } else {
        // Si la validación falla, mostrar un mensaje de error
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

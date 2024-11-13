async function validateAddSongForm(event) {
    event.preventDefault(); // Evita el envío hasta que se validen los campos

    let isValid = true;
    let errorMessage = "";

    const songTitle = document.getElementById('titulo').value;
    const songDuration = document.getElementById('duracion').value;
    const songLink = document.getElementById('link').value;

    // Validación del título de la canción
    if (songTitle.length < 3) {
        isValid = false;
        errorMessage += "El título de la canción debe tener al menos 3 caracteres.\n";
    }

    // Validación de duración (formato mm:ss)
    if (!/^\d{1,2}:\d{2}$/.test(songDuration)) {
        isValid = false;
        errorMessage += "La duración debe estar en formato mm:ss.\n";
    }

    // Validación de URL de YouTube
    if (!/^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/.test(songLink)) {
        isValid = false;
        errorMessage += "Ingrese un enlace válido de YouTube.\n";
    }

    if (isValid) {
        await Swal.fire({
            icon: 'success',
            title: 'Validación exitosa',
            text: 'Todos los datos son correctos. Se procederá a enviar el formulario.',
            confirmButtonText: 'Aceptar'
        });
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

document.querySelector('form[action="AgregarCancion"]').addEventListener('submit', validateAddSongForm);

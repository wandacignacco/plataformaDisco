// Función para obtener y mostrar todos los álbumes
async function getAlbums() {
    try {
        const response = await axios.get('/album');
        const albums = response.data;

        const albumList = document.getElementById('albumList');
        albumList.innerHTML = ''; // Limpiar la lista antes de actualizarla

        albums.forEach(album => {
            const li = document.createElement('li');
            li.className = "mb-4";

            li.innerHTML = `
                <strong>${album.titulo}</strong> - ${album.descripcion} (${album.año})
                <br>
                <img src="${album.portada}" alt="${album.titulo}" width="100">
                <br>
                <button class="bg-blue-500 text-white p-1 rounded" onclick="editAlbum('${album._id}')">Editar</button>
                <button class="bg-red-500 text-white p-1 rounded" onclick="deleteAlbum('${album._id}')">Eliminar</button>
            `;

            albumList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener los álbumes:', error);
    }
}

// Validar y enviar el formulario para agregar un álbum
async function validateAddAlbumForm(event) {
    event.preventDefault();

    // Validación del formulario
    const albumTitle = document.getElementById('title').value.trim();
    const albumYear = parseInt(document.getElementById('year').value, 10);
    const albumDescription = document.getElementById('description').value.trim();
    const albumImageUrl = document.getElementById('image').value.trim();

    let errorMessage = "";

    if (albumTitle.length < 3) {
        errorMessage += "El título del álbum debe tener al menos 3 caracteres.\n";
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(albumYear) || albumYear < 1900 || albumYear > currentYear) {
        errorMessage += "Ingrese un año válido (entre 1900 y el año actual).\n";
    }

    if (albumDescription.length < 10) {
        errorMessage += "La descripción debe tener al menos 10 caracteres.\n";
    }

    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(albumImageUrl)) {
        errorMessage += "Ingrese una URL válida de imagen (jpg, jpeg, png, gif).\n";
    }

    if (errorMessage) {
        await Swal.fire({
            icon: 'error',
            title: 'Error en la validación',
            text: errorMessage,
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Si la validación es exitosa, enviar los datos al servidor
    const albumData = {
        titulo: albumTitle,
        año: albumYear,
        descripcion: albumDescription,
        portada: albumImageUrl
    };

    try {
        const response = await axios.post('/album', albumData);
        console.log(response.data); // Verificar la respuesta del servidor

        await Swal.fire({
            icon: 'success',
            title: 'Álbum Agregado',
            text: 'El álbum ha sido agregado correctamente.',
            confirmButtonText: 'Aceptar'
        });

        document.getElementById('addAlbumForm').reset();
        getAlbums(); // Refrescar la lista de álbumes
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error al agregar el álbum',
            text: error.message,
            confirmButtonText: 'Aceptar'
        });
    }
}

// Editar álbum
async function editAlbum(id) {
    const newTitle = prompt('Nuevo título:');
    const newDescription = prompt('Nueva descripción:');
    const newYear = prompt('Nuevo año:');
    const newImage = prompt('Nueva URL de la portada:');

    if (!newTitle || !newDescription || !newYear || !newImage) {
        alert('Todos los campos son obligatorios para editar un álbum.');
        return;
    }

    const updatedData = {
        titulo: newTitle.trim(),
        descripcion: newDescription.trim(),
        año: parseInt(newYear, 10),
        portada: newImage.trim()
    };

    try {
        await axios.put(`/album/${id}`, updatedData);
        getAlbums(); // Refrescar la lista de álbumes
    } catch (error) {
        console.error('Error al actualizar el álbum:', error);
    }
}

// Eliminar álbum
async function deleteAlbum(id) {
    const confirmDelete = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás deshacer esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmDelete.isConfirmed) {
        try {
            await axios.delete(`/album/${id}`);
            await Swal.fire({
                icon: 'success',
                title: 'Álbum eliminado',
                text: 'El álbum ha sido eliminado correctamente.',
                confirmButtonText: 'Aceptar'
            });
            getAlbums(); // Refrescar la lista de álbumes
        } catch (error) {
            console.error('Error al eliminar el álbum:', error);
        }
    }
}

// Cargar los álbumes al iniciar la página
window.onload = getAlbums;

// Agregar evento al formulario
document.getElementById('addAlbumForm').addEventListener('submit', validateAddAlbumForm);

const express = require('express');
const mongoose = require('mongoose');
const Album = require('../models/album'); // Asegúrate de usar la ruta correcta al modelo
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Función para hashear la contraseña
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Rutas para Album
router.post('/album', async (req, res) => {
    try {
        console.log(req.body); // Verifica los datos
        await Album.create(req.body);
        res.status(201).send("Álbum agregado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear el álbum");
    }
});


router.get('/album', async (req, res) => {
    try {
        const result = await Album.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send("No se encontraron álbumes");
    }
});

router.get('/album/:id', async (req, res) => {
    try {
        const result = await Album.findById(req.params.id);
        if (!result) return res.status(404).send("Álbum no encontrado");
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener el álbum");
    }
});

router.put('/album/:id', async (req, res) => {
    const { titulo, año, descripcion, portada } = req.body;
    const albumId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(albumId)) {
        return res.status(400).send("ID del álbum no válido");
    }

    try {
        const updatedAlbum = await Album.findByIdAndUpdate(
            albumId,
            { titulo, año, descripcion, portada },
            { new: true }
        );
        if (!updatedAlbum) return res.status(404).send("Álbum no encontrado");
        res.status(200).json(updatedAlbum);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en la actualización");
    }
});

router.delete('/album/:id', async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) return res.status(404).send("Álbum no encontrado");
        res.status(200).send("Álbum eliminado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en la eliminación");
    }
});

module.exports = router;

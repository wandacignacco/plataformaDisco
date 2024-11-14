const express = require('express');
const mongoose = require('mongoose');
const albums = require('../models/albums');
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
        await albums.create(req.body);
        res.status(201).send("Álbum agregado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear el álbum");
    }
});

router.get('/album', async (req, res) => {
    try {
        const result = await albums.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send("No se encontraron álbumes");
    }
});

router.get('/album/:id', async (req, res) => {
    try {
        const result = await albums.findById(req.params.id);
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
        const updatedAlbum = await albums.findByIdAndUpdate(
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
        const deletedAlbum = await albums.findByIdAndDelete(req.params.id);
        if (!deletedAlbum) return res.status(404).send("Álbum no encontrado");
        res.status(200).send("Álbum eliminado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en la eliminación");
    }
});

// Rutas para User
router.post('/user', async (req, res) => {
    const { usuario, contrasena, nombre, apellido, email } = req.body;

    // Validar que todos los campos estén presentes
    if (!usuario || !contrasena || !nombre || !apellido || !email) {
        return res.status(400).send("Faltan campos obligatorios");
    }

    try {
        // Hashear la contraseña
        const contrasenaHasheada = await hashPassword(contrasena);

        // Crear un nuevo usuario
        const newUser = new User({
            usuario,
            contrasena: contrasenaHasheada,
            nombre,
            apellido,
            email
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error al crear el usuario', details: error });
    }
});

router.get('/user', async (req, res) => {
    try {
        const result = await User.find({});
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send("No se encontraron usuarios");
    }
});

router.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;

    // Verificar si el usuario existe
    try {
        const updatedUser = await User.findByIdAndUpdate(id, newInfo, { new: true });
        if (!updatedUser) return res.status(404).send("Usuario no encontrado");
        res.status(200).send("Usuario actualizado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en la actualización");
    }
});

// Eliminar usuario
router.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send("Usuario no encontrado");
        res.status(200).send("Usuario eliminado correctamente");
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en la eliminación");
    }
});

module.exports = router;

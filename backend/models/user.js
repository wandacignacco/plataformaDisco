const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minLength: 2,
        lowercase: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        minLength: 2,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return regex.test(v);
            },
            message: 'Debes ingresar un email valido!'
        },
    },
    usuario: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contrasena: {  
        type: String,
        required: true,
        minLength: 2,
        lowercase: true,
        trim: true
    },
    favoritos: { type: String },
});

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const Album = new mongoose.Schema({
    titulo:{type:String,
        required: [true, 'El titulo es requerido'],
        lowercase: true,
        trim: true
},
descripcion:{type:String,
    required: [true, 'La descripción es requerida'],
    minLength: 5,
    maxLength: 200,
    lowercase: true,
    trim: true
},
año:{type:Number,
    required: [true, 'El año es requerido'],
    min: 1,
},
canciones: [{titulo:{type:String}, duracion:{type:String}}],
portada:{type:String},
}) 
    
    
    
module.exports = mongoose.model("Album", Album);

const express = require('express')
const router = require('./routes')
const mongoose = require('mongoose')
const app = express()


app.use(express.json());
app.use('/', router)

const url = 'mongodb+srv://wandacignacco:Diosteamo@proyectodisco.qs0l1.mongodb.net/?retryWrites=true&w=majority&appName=proyectoDisco'

const connectToMongo = async ()=>{

    try{

        await mongoose.connect(url)
    
    app.listen(3000), () => {
    console.log("Servidor escuchando en puerto 3000 y DB conectada"

    )};

      
      }catch(error){
        console.log(error)
      }
    }





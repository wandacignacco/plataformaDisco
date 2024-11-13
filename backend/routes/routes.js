const express = require('express');
const router = express.Router();
const app = express();


router.get("/", (req, res) => {
    console.log(req.body)


    const artista = req.body.artista
    const canción = req.body.canción


    res.status(200).send("La canción "+ canción +"de la artista " + artista + "fue agregada correctamente al albúm");

});

router.get("/users", (req, res) => {
    res.status(200).send("Hasta luego!");
});

router.get("/products", (req, res) => {
    res.status(200).send("Hasta luego!");
});






module.exports = router
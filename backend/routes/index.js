const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json());

app.use('/', router);

app.get("/", (req, res) => {
    res.status(200).send("Hola");
});








app.listen(3000, () =>  {
    console.log('Servidor escuchando en el puerto 3000');

});
const express = require('express');
const app = express();
const port = 3000; // Puerto en el que escuchará el servidor

// Ruta de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor web escuchando en http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// DB y Modelos
const db = require('./database/database');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Rutas
app.use('/api/products', require('./routes/products'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    (async () => {
        try {
            await db.authenticate();
            await db.sync({ force: false });
            console.log('Base de datos ONLINE');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    })();
});
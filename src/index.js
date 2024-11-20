const express = require('express');
const sequelize = require('./config/database');
const path = require('path');

// Configuración
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas 
const UnidadMedidaRoutes = require('./routes/UnidadMedidaRoutes');
const TipoDocumentoRoutes = require('./routes/TipoDocumentoRoutes');
const ArticuloRoutes = require('./routes/ArticuloRoutes');
const EntradaRoutes = require('./routes/EntradaRoutes');
const SalidaRoutes = require('./routes/SalidaRoutes');
const InventarioRoutes = require('./routes/InventarioRoutes');
const viewsRoutes = require('./routes/viewsRoutes');
app.use('/api/unidades-medida', UnidadMedidaRoutes);
app.use('/api/tipos-documento', TipoDocumentoRoutes);
app.use('/api/articulos', ArticuloRoutes);
app.use('/api/entradas', EntradaRoutes);
app.use('/api/salidas', SalidaRoutes);
app.use('/api/inventario', InventarioRoutes);
app.use('/', viewsRoutes);

// Iniciar el servidor de Express
const startServer = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync(); //{ force: true }
      app.listen(PORT, () => {
        console.log(`\nServidor corriendo en http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error( error);
    }
};startServer();



/*--------------------------------------------------------//
npm init -y
npm install sqlite3 sequelize express ejs
npm list --depth=0
//-------------------------------------------------------*/
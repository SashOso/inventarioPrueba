const { Sequelize } = require('sequelize');
//const os = require('os');
const path = require('path'); 

//const ruta = path.join(os.homedir(), 'Documents', 'inventario.db');
const ruta = path.join(__dirname, '../inventario.db');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ruta
});

module.exports = sequelize;
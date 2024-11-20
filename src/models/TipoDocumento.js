const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoDocumento = sequelize.define('tipo_documento', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {timestamps: false ,tableName: 'tipo_documento'});

module.exports = TipoDocumento;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UnidadMedida = sequelize.define('unidad_nedida', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {timestamps: false ,tableName: 'unidad_nedida'});

module.exports = UnidadMedida;

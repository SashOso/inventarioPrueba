const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UnidadMedida = require('./UnidadMedida'); // Ensure correct import

const Articulo = sequelize.define('articulo', {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unidad_medida_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UnidadMedida,
            key: 'id'
        },
        allowNull: false
    }
    
}, { timestamps: false ,tableName: 'articulo'});

Articulo.belongsTo(UnidadMedida, { foreignKey: 'unidad_medida_id', as: 'unidad_medida' });

module.exports = Articulo;

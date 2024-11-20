const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Articulo = require('./Articulo');
const TipoDocumento = require('./TipoDocumento');

const Salida = sequelize.define('salida', {
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    articulo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Articulo,
            key: 'id'
        },
        allowNull: false
    },
    tipo_documento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoDocumento,
            key: 'id'
        },
        allowNull: false
    },
    numero_documento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {timestamps: false,tableName: 'salida'});

Salida.belongsTo(Articulo, { foreignKey: 'articulo_id', as: 'articulo' });
Salida.belongsTo(TipoDocumento, { foreignKey: 'tipo_documento_id', as: 'tipo_documento' });

module.exports = Salida;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Articulo = require('./Articulo');
const TipoDocumento = require('./TipoDocumento');

const Entrada = sequelize.define('entrada', {
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

}, {timestamps: false,tableName: 'entrada'});

Entrada.belongsTo(Articulo, { foreignKey: 'articulo_id', as: 'articulo' });
Entrada.belongsTo(TipoDocumento, { foreignKey: 'tipo_documento_id', as: 'tipo_documento' });

module.exports = Entrada;

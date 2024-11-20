const UnidadMedida = require('../models/UnidadMedida');
const TipoDocumento = require('../models/TipoDocumento');
const Articulo = require('../models/Articulo');
const Entrada = require('../models/Entrada');
const Salida = require('../models/Salida');


module.exports.lista = async () => {
    return await Articulo.findAll({
        include: [
            {model: UnidadMedida, as: 'unidad_medida'}
        ]
    });
};
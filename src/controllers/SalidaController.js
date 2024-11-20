const model = require('../models/Salida');
const Articulo= require('../models/Articulo');
const TipoDocumento= require('../models/TipoDocumento');
const UnidadMedida= require('../models/UnidadMedida')

module.exports.lista = async () => {
    return await model.findAll({include: [
        {model: TipoDocumento, as: 'tipo_documento'},
        {model: Articulo, as: 'articulo',include:[
            { model: UnidadMedida, as: 'unidad_medida' }
        ]}
    ]});
};
module.exports.buscar = async (id) => {
    const obj = await model.findByPk(id,{include: [
        {model: TipoDocumento, as: 'tipo_documento'},
        {model: Articulo, as: 'articulo',include:[
            { model: UnidadMedida, as: 'unidad_medida' }
        ]}
    ]});
    return obj;
};
module.exports.agregar= async (obj) => {
    return await model.create(obj);
};
module.exports.actualizar= async (obj) => {
    const obj_a_modificar = await model.findByPk(obj.id);
    return await obj_a_modificar.update(obj);
};
module.exports.eliminar = async (id) => {
    const obj = await model.findByPk(id);
    await obj.destroy();
    return obj;
};
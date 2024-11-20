const model = require('../models/Articulo');
const UnidadMedida = require('../models/UnidadMedida'); // Asegúrate de que esto esté importado correctamente


module.exports.lista = async () => {
    return await model.findAll({ include: [
        { model: UnidadMedida, as: 'unidad_medida'}
    ]});
}; 
module.exports.buscar = async (id) => {
    const obj = await model.findByPk(id,{ include: [
        { model: UnidadMedida, as: 'unidad_medida' }
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
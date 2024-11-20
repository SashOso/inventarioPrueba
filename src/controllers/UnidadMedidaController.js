const model = require('../models/UnidadMedida');

module.exports.lista = async () => {
    return await model.findAll();
};
module.exports.buscar = async (id) => {
    const obj = await model.findByPk(id);
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
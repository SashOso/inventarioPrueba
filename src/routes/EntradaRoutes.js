const express = require('express');
const controller = require('../controllers/EntradaController');

const router = express.Router();

//lista
router.get('/', async (req, res) => {
    try{
        const lista = await controller.lista();
        res.json(lista);
    }catch(error){
        res.status(500).json({ error: 'Error al listar' });
    }
});

//agregar
router.post('/', async (req, res) => {
    try{
        const obj = await controller.agregar(req.body);
        res.json(obj);
    }catch(error){
        res.status(500).json({ error: 'Error al agregar' });
    }
});

// Actualizar
router.put('/', async (req, res) => {
    try{
        const obj = await controller.actualizar(req.body);
        res.json(obj);
    }catch(error){
        res.status(500).json({ error: 'Error al actualizar' });
    }
});
// Buscar por ID
router.get('/:id', async (req, res) => {
    try{
        const obj = await controller.buscar(req.params.id);
        res.json(obj);
    }catch(error){
        res.status(500).json({ error: 'Error al buscar' });
    }
});

// Eliminar
router.delete('/:id', async (req, res) => {
    try{
        const obj = await controller.eliminar(req.params.id);
        res.json(obj);
    }catch(error){
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

module.exports = router;
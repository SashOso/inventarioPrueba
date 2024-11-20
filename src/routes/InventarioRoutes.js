const express = require('express');
const controller = require('../controllers/InventarioController');

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


module.exports = router;
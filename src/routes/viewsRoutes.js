const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/articulos', (req, res) => {
    res.render('articulos');
});
router.get('/entradas', (req, res) => {
    res.render('entradas');
});
router.get('/salidas', (req, res) => {
    res.render('salidas');
});
router.get('/tipos-documento', (req, res) => {
    res.render('tipos-documento');
});
router.get('/unidades-medida', (req, res) => {
    res.render('unidades-medida');
});
router.get('/inventario', (req, res) => {
    res.render('inventario');
});
module.exports = router;

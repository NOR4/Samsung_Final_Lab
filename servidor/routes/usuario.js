//Rutas para usuario
const express = require('express');
const router = express.Router();
const usuarioControllerr = require('../controllers/usuarioController');

//api usuarios
router.post('/', usuarioControllerr.crearUsuario);
router.get('/', usuarioControllerr.obtenerUsuarios);
router.put('/:id', usuarioControllerr.actualizarUsuario);
router.get('/:id', usuarioControllerr.obtenerUsuario);
router.delete('/:id', usuarioControllerr.eliminarUsuario);

module.exports = router;
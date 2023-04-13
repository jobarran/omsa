/*
    Rutas de Obras
    host + /api/obra
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { crearObra, getObras, eliminarObra, actualizarObra } = require('../controllers/obraAdmin');
const { validarCampos } = require('../middlewares/validar-compos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Defino las rutas y le agrego los controladores (logica)

// Todas tienen que pasar por validacion del JWT
router.use( validarJWT );

// Obtener obras
router.get('/', getObras );

// Crear obra
router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('code', 'El código es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearObra 
);

// Borrar obra
router.delete('/:id', eliminarObra );

// Actualizazr obra
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('code', 'El código es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarObra );

// router.get('/renew', validarJWT ,revalidarToken );

module.exports = router
/*
    Rutas de Obras
    host + /api/obra
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { crearObra, getObras } = require('../controllers/obraAdmin');
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

// router.get('/renew', validarJWT ,revalidarToken );

module.exports = router
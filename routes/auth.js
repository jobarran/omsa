/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken, getUsuarios, eliminarUsuario, actualizarUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-compos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Defino las rutas y le agrego los controladores (logica)

router.post(
    '/new', 
    [ // middlewares
        check('name', 'El usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('sector', 'El sector es obligatorio'),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/', 
    [ // middlewares - Validators -
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos // custom middleware
    ],
    loginUsuario);

// Actualizazr usuario
router.put(
    '/:id',
    [
        check('name', 'El usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('sector', 'El sector es obligatorio'),
        validarCampos
    ],
    actualizarUsuario );

// Obtener usuarios
router.get('/', getUsuarios );

// Borrar usuario
router.delete('/:id', eliminarUsuario );

router.get('/renew', validarJWT ,revalidarToken );

module.exports = router
/*
    Rutas de Obras / OM
    host + /api/om
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-compos');
const { crearOm, getOms, actualizarOm, eliminarOm } = require('../controllers/om');

const router = Router();

// Defino las rutas y le agrego los controladores (logica)

// Todas tienen que pasar por validacion del JWT
// router.use( validarJWT );

// Obtener OMs
router.get('/', getOms );

// Nueva OM
router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('sector', 'El sector es obligatorio').not().isEmpty(),
        check('task', 'La tarea es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearOm 
);

// Actualizazr om
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('sector', 'El sector es obligatorio').not().isEmpty(),
        check('task', 'La tarea es obligatoria').not().isEmpty(),
        validarCampos
    ],
    actualizarOm );

// Borrar om
router.delete('/:id', eliminarOm );

module.exports = router
/*
    Rutas de Obras / Remitos
    host + /api/remitos
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-compos');
const { getRemitos, createUpdateRemito, actualizarRemito, eliminarRemito,actualizarRemitoSubElement, eliminarRemitoSubElement,  } = require('../controllers/remito');

const router = Router();

router.get('/', getRemitos );

// Nueva Remite
router.put(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('date', 'La fecha es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createUpdateRemito 
);

// Actualizazr Remito
router.put(
    '/:id',
    actualizarRemito
);

// Borrar Remito
router.delete(
    '/:id', 
    eliminarRemito
);

// Borrar RemitoSubElement
router.delete(
    '/:id/:uid',
    eliminarRemitoSubElement
);

// New RemitoSubElement
router.put(
    '/:id/add',
    actualizarRemitoSubElement
);

module.exports = router
const { Schema, model } = require('mongoose');

const RemitoSchema = Schema({
    name: {
        type: Number,
        require: true,
        unique: true
    },
    date:{
        type: String,
        default: null
    },
    obra_id: {
        type: Number,
        require: true,
    },
    remitoElements: [{
        omId: {
            type: String,
            require: true,
        },
        cant: {
            type: Number,
            require: true,
        },
        code: {
            type: String,
            require: true,
        },
    }],
    
});


module.exports = model('Remito', RemitoSchema );
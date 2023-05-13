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
    remitoElements: [{
        om_id: {
            type: number,
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
const { Schema, model } = require('mongoose');

const OmSchema = Schema({
    obra_id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    floor: {
        type: Number,
        require: true,
    },
    sector: {
        type: String,
        require: true,
    },
    task: {
        type: String,
        require: true,
    },
    request:{
        type: Boolean,
        default: false
    },
    necesity:{
        type: Date
    },
    elements: [{
        cant: {
            type: Number,
            require: true,
        },
        code: {
            type: String,
            require: true,
        },
        id: {
            type: Number,
            require: false
        },
        desc: {
            type: String,
            require: true,
        },
        received:{
            type: Number,
            default: 0,
            require: false
        }


    }],
});


module.exports = model('Om', OmSchema );
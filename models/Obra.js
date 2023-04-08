const { Schema, model } = require('mongoose');

const ObraSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    code: {
        type: Number,
        require: true,
        unique: true
    },
});


module.exports = model('Obra', ObraSchema );
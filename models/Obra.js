const { Schema, model } = require('mongoose');

const ObraSchema = Schema({
    name: {
        type: String,
        require: true,
        index:true, 
        sparse:true,
    },
    code: {
        type: Number,
        require: true,
        unique: true,
        index:true, 
        sparse:true,
    },
});


module.exports = model('Obra', ObraSchema );
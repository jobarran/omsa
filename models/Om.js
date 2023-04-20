const { Schema, model } = require('mongoose');

const OmSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    sector: {
        type: String,
        require: true,
    },
    task: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
});


module.exports = model('Om', OmSchema );
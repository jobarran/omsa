
const { response } = require("express");
const Obra = require('../models/Obra');

const getObras = async( req, res = response ) => {

    const obras = await Obra.find()
                                .populate( 'code', 'name' );

    res.json({
        ok: true,
        obras
    })

}

const crearObra = async(req, res = response ) => {

    const { name, code } = req.body;

    try {
        let obra = await Obra.findOne({ code });

        if ( obra ) {
            return res.status(400).json({
                ok: false,
                msg: 'La obra ya está registrada'
            });
        }

        obra = new Obra( req.body );
    
        await obra.save();

        res.status(201).json({
            ok: true,
            uid: obra.id,
            name: obra.name,
            code: obra.code,
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

module.exports = {
    crearObra,
    getObras
}
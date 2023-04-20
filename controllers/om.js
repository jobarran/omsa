const { response } = require("express");
const Obra = require('../models/Obra');
const Om = require("../models/Om");

const getOms = async( req, res = response ) => {

    const oms = await Om.find()
                                .populate( 'name' );

    res.json({
        ok: true,
        oms
    })

}


const crearOm = async(req, res = response ) => {

    const { name, sector, task, state } = req.body;

    try {
        let om = await Om.findOne({ name });

        if ( om ) {
            return res.status(400).json({
                ok: false,
                msg: 'La OM ya está registrada'
            });
        }

        om = new Om( req.body );
    
        await om.save();

        res.status(201).json({
            ok: true,
            uid: om.id,
            name: om.name,
            sector: om.sector,
            task: om.task,
            state: om.state
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const actualizarOm = async( req, res = response ) => {
    
    const omId = req.params.id;
    const uid = req.uid;

    try {

        const om = await Om.findById( omId );

        if ( !om ) {
            console.log('hasta aqui viene bien')
            return res.status(404).json({
                ok: false,
                msg: 'OM no existe por ese id'
            });
        }

        const nuevaOm = {
            ...req.body,
            om: uid
        }

        const omActualizada = await Om.findByIdAndUpdate( omId, nuevaOm, { new: true } );

        res.json({
            ok: true,
            evento: omActualizada
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}



module.exports = {
    crearOm,
    getOms,
    actualizarOm,
}
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

    const { name, sector, task } = req.body;

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
            obraId: om.obra_id,
            name: om.name,
            floor: om.floor,
            sector: om.sector,
            task: om.task,
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
    const { name, sector, task, cant, code, desc } = req.body;

    try {

        const om = await Om.findById( omId );

        if ( !om ) {
            return res.status(404).json({
                ok: false,
                msg: 'OM no existe por ese id'
            });
        }

        const nuevaOm = {
            ...{name, sector, task},
            om: uid
        }

        const omActualizada = await Om.findByIdAndUpdate( omId, nuevaOm, { new: true } );
        const elementosActualizados = await Om.findByIdAndUpdate( omId, { $push: { "elements": {cant, code, desc}} }, { new: true })

        res.json({
            ok: true,
            evento: elementosActualizados,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const eliminarOmSubElement = async( req, res = response ) => {

    const omId = req.params.id;
    const elId = req.params.uid;

    console.log(omId);
    console.log(elId);

    //res.json({ ok: true });

    try {

        const om = await Om.findById( omId );

        if ( !om ) {
            return res.status(404).json({
                ok: false,
                msg: 'OM no existe por ese id'
            });
        }

        const elementosActualizados = await Om.findByIdAndUpdate( omId, { $pull: { "elements": { _id : elId }} })

        res.json({
            ok: true,
            evento: elementosActualizados,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarOm = async( req, res = response ) => {

    const omId = req.params.id;

    try {

        const om = await Om.findById( omId );

        if ( !om ) {
            return res.status(404).json({
                ok: false,
                msg: 'OM no existe por ese id'
            });
        }

        await Om.findByIdAndDelete( omId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

module.exports = {
    crearOm,
    getOms,
    actualizarOm,
    eliminarOm,
    eliminarOmSubElement
}
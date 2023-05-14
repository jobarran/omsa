const { response } = require("express");
const Remito = require('../models/Remito');

const getRemitos = async( req, res = response ) => {

    const remitos = await Remito.find()
                                .populate( 'name' );

    res.json({
        ok: true,
        remitos
    })

}


const createUpdateRemito = async(req, res = response ) => {

    const { name, date, obra_id, remitoElements } = req.body;
    console.log(remitoElements)
    try {

        // the ID of the document to update or create
        const filter = { name }; 
        // add new sub-elements to the array, and update the rest of the fields
        const update = { $addToSet: { remitoElements: { $each: remitoElements } }, ...{ name, date, obra_id } }; 


            const remitoUpdated = await Remito.findOneAndUpdate(
                filter, update, { upsert:true, new:true }
            )
            res.status(201).json({
                ok: true,
                remitoUpdated
            })

    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const actualizarRemito = async( req, res = response ) => {
      

};

const eliminarRemito = async( req, res = response ) => {
 

};

const actualizarRemitoSubElement = async( req, res = response ) => {
    

};

const eliminarRemitoSubElement = async( req, res = response ) => {


}



module.exports = {
    getRemitos,
    createUpdateRemito,
    actualizarRemito,
    eliminarRemito,
    eliminarRemitoSubElement,
    actualizarRemitoSubElement
}
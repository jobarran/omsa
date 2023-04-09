const { response } = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name, usuario.sector );
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            sector: usuario.sector,
            token
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


const loginUsuario = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name, usuario.sector );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            sector: usuario.sector,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const revalidarToken = async (req, res = response ) => {

    const { uid, name, sector } = req;

    // Generar JWT
    const token = await generarJWT( uid, name, sector );

    res.json({
        ok: true,
        uid,
        name,
        sector,
        token
    })
};

const getUsuarios = async( req, res = response ) => {

    const usuarios = await Usuario.find()
                                .populate( 'name', 'sector' );

    res.json({
        ok: true,
        usuarios,
    })

}

const eliminarUsuario = async( req, res = response ) => {

    const usuarioId = req.params.id;
    const uid = req.uid;

    try {

        const usuario = await Usuario.findById( usuarioId );

        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }

        await Usuario.findByIdAndDelete( usuarioId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarUsuario = async( req, res = response ) => {
    
    const usuarioId = req.params.id;
    const uid = req.uid;

    try {

        const usuario = await Usuario.findById( usuarioId );

        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe por ese id'
            });
        }

        const nuevoUsuario = {
            ...req.body,
            user: uid
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( usuarioId, nuevoUsuario, { new: true } );

        res.json({
            ok: true,
            evento: usuarioActualizado
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
    crearUsuario,
    loginUsuario,
    revalidarToken,
    getUsuarios,
    eliminarUsuario,
    actualizarUsuario
}
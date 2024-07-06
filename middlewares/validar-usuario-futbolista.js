const Futbolista = require("../models/futbolista");

const validarUsuarioFutbolista = async (req, res, next)=> {

    const usuario = req.usuario;
    console.log({usuario});

    if (!usuario.asAdmin){
        const id = req.params.id;

        console.log (id);

        const futbolista = await Futbolista.findById(id);

        console.log({futbolista});

        if(!futbolista){
            res.status(401).json({
                status: false,
                message: "No existe el futbolista"
            })
        }

        if(!usuario._id.equals(futbolista.usuario)){
            res.status(401).json({
                status: false,
                message: `el usuario ${usuario.nombre} no tiene permisos`
            })
        }
    }

    next();

}

module.exports= validarUsuarioFutbolista;
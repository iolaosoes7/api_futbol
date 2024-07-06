const {Schema, model} = require('mongoose');

// modelar el usuario

const FutbolistaSchema = Schema({
    apodo: {
        type: String
    },
    edad: {
        type: Number
    },
    equipos: {
        type: String
    },
    imagen: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    posicion: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', //referencia de la coleccion
        required: true
    }
    
});

FutbolistaSchema.methods.toJSON = function(){
    const {__v, _id, ...futbolista} = this.toObject();
    futbolista.uid= _id;
    return futbolista;
}
module.exports = model('Futbolista', FutbolistaSchema);
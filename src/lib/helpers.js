const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => { //recibimos texto plano
    const salt = await bcrypt.genSalt(10); //Devuelve patron de cifrado
    const hash = await bcrypt.hash(password, salt); // paso parametros para cifrar
    return hash;
};

//compara contraseñas
helpers.matchPassword = async (password, savedPassword)=> { 
    try{
        return await bcrypt.compare(password, savedPassword);
    }
    catch(e) {
        console.log(e);
    }
};

module.exports = helpers;
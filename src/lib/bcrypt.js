const bcrypt = require('bcryptjs');
const encriptar = {};

//ENCRIPTAR ALUMNO
encriptar.encryptPassword = async (pass_alum) => {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(pass_alum, salt);
    return hash;
};

encriptar.matchPassword = async (pass_alum, savedPassword) =>{
    try{
        return await bcrypt.compare(pass_alum, savedPassword);
    } catch(e){
        console.log(e);
    }
};

module.exports = encriptar;
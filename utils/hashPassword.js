
const bcrypt = require('bcrypt');

const converthashpassword = async (password)=>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashpassword = await bcrypt.hash(password, salt);
    return hashpassword;
}

module.exports = converthashpassword;
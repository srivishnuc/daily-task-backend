var { registerModel, getUserByEmailModal } = require('./model.js')
var { jwtToken } = require('../db/connection')
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const user = await getUserByEmailModal(req.body.email)
    if (user.length) {
        res.status(401).send({ status: 'failed', msg: 'user account already exists' })
    }
    else {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
        givenPassword = req.body.password;
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        registerModel(req, res, givenPassword)


    }
}



const loginUser = async (req, res) => {
    // loginUserModel(req, res)getUserByEmail
    const user = await getUserByEmailModal(req.body.email);
    const { password } = req.body;

    if (user.length) {

        jwtToken(password, user[0])
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error))

    } else {
        res.status(401).send({ status: 'failed', msg: 'Not a valid email' })
    }

}



module.exports = { registerUser, loginUser } 
var { executeQuery, jwtToken } = require('../db/connection')

const registerModel = (req, res, givenPassword) => {
    const { name, email, password } = req.body
    executeQuery('insert into users(name,email,password,created_time ) values ($1,$2,$3,now())', [name, email, password])
        .then(result => {
            jwtToken(givenPassword, result.user[0])
                .then(result => res.status(200).send(result))
                .catch(error => res.status(400).send(error))
        })
        .catch(err => res.status(500).send(err))

}



const getUserByEmailModal = (email) => {
    return new Promise((resolve, reject) => {
        executeQuery(`SELECT * FROM users where email = $1`, [email])
            .then(result => resolve(result.rows))
            .catch(err => reject({ msg: 'Error executing query', error: err }))
    })
}

module.exports = { registerModel, getUserByEmailModal }
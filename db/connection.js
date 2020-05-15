const { Pool } = require('pg')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString: connectionString })

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err) {
                reject({ status: 'failed', msg: 'error connecting..' })
            }
            else {
                client.query(query, params, (err, result) => {
                    release()
                    if (err) {
                        reject({ status: 'failed', msg: 'error executing query' })
                    }
                    else {
                        resolve({ status: 'sucess', msg: 'query executed sucessfully', user: [{ name: params[0], email: params[1], password: params[2] }], rows: result.rows })
                    }
                })
            }
        })
    })
}



const jwtToken = (givenPassword, user) => {
    return new Promise((resolve, reject) => {
        console.log(givenPassword)
        let isPassMatch = bcrypt.compareSync(givenPassword, user.password);
        console.log(isPassMatch)
        if (isPassMatch) {
            let token = jwt.sign({
                data: { id: user.id, email: user.email },
            }, 'testsecret', { expiresIn: '24h' });
            console.log(token)
            resolve({ status: 'success', msg: 'successfull', data: token })
        } else {
            reject({ status: 'failed', msg: 'Email or Password incorrect' })
        }

    }

    )

}


module.exports = { pool, executeQuery, jwtToken }
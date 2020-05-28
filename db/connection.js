const { Pool } = require('pg')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString: connectionString })

const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err) {
                reject({ status: 'failed', msg: 'error connecting..', err })
            }
            else {
                client.query(query, params, (err, result) => {
                    release()
                    if (err) {
                        reject({ status: 'failed', msg: 'error executing query', err })
                    }
                    else {
                        // console.log(result)
                        resolve({ status: 'success', msg: 'query executed sucessfully', rows: result.rows })
                    }
                })
            }
        })
    })
}



const jwtToken = (givenPassword, user) => {
    return new Promise((resolve, reject) => {
        let isPassMatch = bcrypt.compareSync(givenPassword, user.password);
        if (isPassMatch) {
            let token = jwt.sign({
                data: { id: user.empno, name: user.name, dept: user.dept_no, des: user.des_no, report_to: user.report_to },
            }, 'testsecret', { expiresIn: '24h' });
            resolve({ status: 'success', msg: 'successfull', data: token })
        } else {
            reject({ status: 'failed', msg: 'Email or Password incorrect' })
        }

    }

    )

}


module.exports = { pool, executeQuery, jwtToken }
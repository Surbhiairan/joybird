const DB = require('../utils/db');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * User Service class is container of all helper functions 
 * those can be used to perform specific operations on USER
*/
class UserService {

    // SignUp
    static signUp(data) {
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        var connection;
        return new Promise((resolve, reject) => {
            DB.getConnection().
                then(conn => {
                    connection = conn;
                    return new Promise((res, rej) => {
                        connection.query(`Select email from User `, (err, result) => {
                            // DB.releaseConnection(connection);
                            if (err) {
                                DB.releaseConnection(connection);
                                reject(err);
                            } else {
                                let count = 0;
                                result.map(dt => {
                                    if (dt.email == data.email) {
                                        count = count + 1;
                                    }
                                })

                                if (!count) {
                                    res();
                                } else {
                                    DB.releaseConnection(connection);
                                    resolve("USER_ALREADY_REGISTERED");
                                }
                            }
                        })
                    })
                }).then(() => {
                    data = DB.addAttributesForNew(data, data.userId);
                    delete data.userId;
                    connection.query(`INSERT INTO User SET ?`, [data], (err, result) => {
                        console.log('result----', result);
                        DB.releaseConnection(connection);
                        if (err) {
                            if (err.code == "ER_DUP_ENTRY") {
                                resolve("USER_ALREADY_REGISTERED")
                            }
                            reject(err)
                        } else {
                            resolve(result);
                        }
                    })
                })
                .catch(err => {
                    DB.releaseConnection(connection);
                    reject(err);
                })
        });

    }

   
    static login(data) {
        var connection;
        var email = data.email;
        var password = data.password;

        return new Promise((resolve, reject) => {
            DB.getConnection().
                then(conn => {
                    connection = conn;
                    connection.query('SELECT * FROM `User` WHERE email = ?', [email],
                        function (error, rows) {
                            DB.releaseConnection(connection);
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (rows && rows.length > 0) {
                                    let pass = bcrypt.compareSync(password, rows[0].password);
                                    if (pass) {
                                        console.log(rows)
                                        resolve(rows);
                                    } else {
                                        let err = 'INVALID_PASSWORD';
                                        reject(err);
                                    }
                                } else {
                                    let err = "INVALID_EMAIL";
                                    reject(err);
                                }
                            }
                        });
                })
                .catch(err => {
                    DB.releaseConnection(connection);
                    reject(err);
                })
        });
    }
}

module.exports = UserService;


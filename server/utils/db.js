const path = require('path');
const mysql = require('mysql');
const config = require('../config/env');
const pool = mysql.createPool(`${config.db_url}?connectionLimit=${config.db_connection_limit}
&dateStrings=true&multipleStatements=true
&acquireTimeout=${config.db_acquire_timeout}
&connectTimeout=${config.db_connect_timeout}`);


class DB {

  static getConnection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        console.log('database connected');
        if (err) { console.log(err); return reject(err); }
        return resolve(connection);
      });
    });
  }

  static releaseConnection(connection) {
    if (!DB.isReleased(connection)) {
      connection.release();
    }
  }

  static isReleased(connection) {
    return pool._freeConnections.indexOf(connection) !== -1;
  }

  static commitTransaction(connection) {
    return new Promise((resolve, reject) => {
      connection.commit((err) => {
        if (err) { return reject(err); }

        if (!DB.isReleased(connection)) { connection.release(); }
        return resolve();
      });
    });
  }



  static rollbackTransaction(connection) {
    return new Promise((resolve, reject) => {
      connection.rollback((err) => {
        if (!DB.isReleased(connection)) { connection.release(); }

        if (err) { return reject(err); }
        return resolve();
      });
    });
  }

  static beginTransaction(connection) {
    return new Promise((resolve, reject) => {
      try {
        connection.beginTransaction(err => {
          if (err) { throw err; }

          return resolve();
        });
      }
      catch (error) {
        if (!DB.isReleased(connection)) { connection.release(); }
        console.log(error);
        return reject(error);
      }
    });
  }

  static addAttributesForNew(object, userId){
    object['created_date'] = new Date();
    object['created_by'] = userId;
    return object;
  }

  static addAttributesForEdit(object, userId){
    object['updated_date'] = new Date();
    object['updated_by'] = userId;
    return object;
  }


}
module.exports = DB;

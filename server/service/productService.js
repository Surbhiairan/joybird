const DB = require('../utils/db');
const Product = require('../model/product');

class ProductService {

    static getAllProducts() {
        return new Promise((resolve, reject) => {
            let conn;
            return DB.getConnection().then(connection => {
                conn = connection;
                return conn.query(`select * from Product`, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    let products = result.map(item => {
                        return new Product(item);
                    });
                    resolve(products);
                });
            })
        })
    }

    static getProductByID(id) {
        let conn;
        return new Promise((resolve, reject) => {
            return DB.getConnection()
                .then(connection => {
                    conn = connection;
                    return conn;
                })
                .then((conn) => {
                    conn.query(
                        `select * from Product WHERE product_id = ?`, id, (err, results) => {
                            if (results) {
                                let product = new Product(results[0]);
                                resolve(product);
                            }
                        });
                });
        });
    }

    static addProduct(product) {
        let conn;
        return new Promise((resolve, reject) => {
            return DB.getConnection()
                .then(connection => {
                    conn = connection;
                    return DB.beginTransaction(conn);
                })
                .then(() => {
                    conn.query(
                        `INSERT INTO Product SET ?`, 
                        [product], 
                        (err, results) => {
                            console.log(results)
                            if (err) { return reject(err); }
                            else {
                                DB.commitTransaction(conn).then(() => {
                                    conn.query(
                                        `select * from Product WHERE product_id = ?`, results.insertId, (err, results) => {
                                            if (results) {
                                                let product = new Product(results[0]);
                                                resolve(product);
                                            }
                                        });
                                })

                            }

                        });
                })
                .catch(err => {
                    return DB.rollbackTransaction(conn)
                        .then(() => {
                            reject(err);
                        });
                })
        });
    }

    static editProduct(product) {
        let conn;
        return new Promise((resolve, reject) => {
            return DB.getConnection()
                .then(connection => {
                    conn = connection;
                    return DB.beginTransaction(conn);
                })
                .then(() => {
                    conn.query(
                        `update Product SET product_name = ? , sizes = ? , category = ? , available_quantity = ? ,unit_price = ? ,image_url = ?  WHERE product_id = ?`,
                        [ product.product_name, 
                            product.sizes, 
                            product.category, 
                            product.available_quantity, 
                            product.unit_price, 
                            product.image_url, 
                            product.product_id 
                        ], (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            else {
                                DB.commitTransaction(conn).then(() => {
                                    conn.query(
                                        `select * from Product WHERE product_id = ?`, product.product_id, (err, results) => {
                                            if (results) {
                                                let product = new Product(results[0]);
                                                resolve(product);
                                            }
                                        })
                                })
                            }

                        });
                })
                .catch(err => {
                    return DB.rollbackTransaction(conn)
                        .then(() => {
                            reject(err);
                        });
                })
        });
    };

    static deleteProduct(product) {
        console.log('product-----', product)
        let conn;
        return new Promise((resolve, reject) => {
            return DB.getConnection()
                .then(connection => {
                    conn = connection;
                    return DB.beginTransaction(conn);
                })
                .then(() => {
                    conn.query(
                        `delete from Product WHERE product_id = ?`,product.product_id, (err, results) => {
                            if (err) {
                                return reject(err);
                            }
                            else {
                                console.log('reulst---', results)
                                DB.commitTransaction(conn).then(() => {
                                   ProductService.getAllProducts().then(products =>{
                                    resolve(products);
                                   });
                                })
                            }
                        });
                })
                .catch(err => {
                    return DB.rollbackTransaction(conn)
                        .then(() => {
                            reject(err);
                        });
                })
        });
    }

    static buyNow(productId,totalItem){
        let conn;
         return new Promise((resolve, reject) => {
            return DB.getConnection()
                .then(connection => {
                    conn = connection;
                    return DB.beginTransaction(conn);
                })
                .then(()=>{
                    return ProductService.getProductByID(productId)
                })
                .then((product) => {
                    let updatedItem = product.availabeItem - totalItem ;
                    conn.query(
                        `update Product SET availabeItem = ? WHERE productId = ?`,
                        [updatedItem,productId], err => {
                            if (err) {
                                return reject(err);
                            }
                            else {
                                DB.commitTransaction(conn).then(() => {
                                    return ProductService.getProductByID(productId).then( product =>{
                                        resolve(product);
                                    });
                                })
                            }

                        });
                })
                .catch(err => {
                    return DB.rollbackTransaction(conn)
                        .then(() => {
                            reject(err);
                        });
                })
        });
    }

}

module.exports = ProductService;
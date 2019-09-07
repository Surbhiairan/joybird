const DB = require('../utils/db');
const Product = require('../model/product');

class CartService {

    static getCartProducts(userId) {
        return new Promise((resolve, reject) => {
            let conn;
            return DB.getConnection().then(connection => {
                conn = connection;
                return conn.query(`SELECT P.productId, P.title, P.manufacturer,P.availabeItem,P.imageUrl,P.userRating,P.description,P.category,P.price FROM Product P
                LEFT JOIN Cart C ON C.productId = P.productId
                WHERE C.userId = ?`, [userId], (err, results) => {
                        if (err) {
                            return reject(err);
                        } else {
                            let products = results.map( result =>{
                                return new Product(result);
                            });
                            resolve(products);
                        }

                    });
            })
        })
    }

    static addProductToCart(args) {
        const productId = args.productId;
        const userId = args.userId
        let conn;
        return new Promise((resolve, reject) => {
            return DB.getConnection()
                .then(connection => {
                    conn = connection;
                    return DB.beginTransaction(conn);
                })
                .then(() => {
                    return DB.getNextColumnValue('Cart', 'cartId')
                })
                .then((id) => {
                    const cart = {
                        cartId: id,
                        userId: userId,
                        productId: productId
                    }
                    return cart
                })
                .then((cart) => {
                    conn.query(
                        `INSERT INTO Cart SET ?`, cart, (err, results) => {
                            if (err) { return reject(err); }
                            else {
                                DB.commitTransaction(conn).then(() => {
                                    CartService.getCartProducts(userId).then(products => {
                                        resolve(products);
                                    })
                                });
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

module.exports = CartService;

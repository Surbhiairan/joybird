const ProductService = require('./service/productService');
const UserService = require('./service/userService');
const CartService = require('./service/cartService');
const User = require('./model/user');
const Product = require('./model/product');

export const resolvers = {
    Query: {

        getAllProducts: async () => {
            const products = await ProductService.getAllProducts();
            console.log('products---', products);
            return products;
        },

        getProductDetails: async (parent, param) => {
            const product = await ProductService.getProductByID(param.productId);
            return product;
        },

        getCartItems: async (parent, param) => {
            const product = await CartService.getCartProducts(param.userId);
            return product;
        }


    },
    Mutation: {

        addProduct: async (parent, payload) => {
            const product = await ProductService.addProduct(payload);
            return product;
        },

        editProduct: async (parent, payload) => {
            const product = await ProductService.editProduct(payload);
            return product;
        },

        deleteProduct: async (parent, payload) => {
            const products = await ProductService.deleteProduct(payload);
            return products;
        },

        signUp: async (parent, payload) => {
            console.log('resolver--', parent, 'payload----', payload)
            const user = await UserService.signUp(payload);
            return user;
        },

        addToCart: async (parent, payload) => {
            const user = await CartService.addProductToCart(payload);
            return user;
        },

        purchase: async (parent, payload) => {
            const products = await ProductService.buyNow(payload.product_id, payload.totalItem);
            return products;
        },

        login: async (parent, payload) => {
            const user = await UserService.login(payload);
            let newUser = new User(user[0])
            return newUser;
        },


    }
};
import {
    makeExecutableSchema,
} from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
    type Product {
        product_id: ID!
        product_name: String
        sizes(size: Size): String
        category(category: Category): String
        available_quantity: Int
        unit_price: Float
        image_url: String
    }
    type User {
        user_id: ID!
        first_name: String
        last_name: String
        password: String
        email: String
        role(role: Role): String
    }
    enum Role {
        ADMIN
        CLIENT
    }

    enum Size {
        XS
        S
        M
        L
        XL
    }

    enum Category {
        JEANS
        TOPS
        FOOTWEAR
    }

    type Query {
        getAllProducts : [Product]
        getProductDetails(productId:ID!) : Product 
        getCartItems(userId:ID!) : [Product]
    }

    type Mutation {
        addProduct (
            product_name: String
            available_quantity: Int
            sizes: Size
            category: Category
            unit_price: Float
            image_url: String) : Product,
        
        editProduct(
            product_id: ID!
            product_name: String
            available_quantity: Int
            sizes: Size
            category: Category
            unit_price: Float
            image_url: String) : Product

        deleteProduct(
            product_id: ID!) : [Product]

        signUp(
            first_name: String
            last_name: String
            email: String
            password: String
            role: Role) : User 
            
        login(
            email:String!
            password:String!) : User

        addToCart(
            user_id:ID!
            product_id:ID!) : [Product]
        
        purchase(
            product_id:ID!
            total_item:Int) : Product 
        
    }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });



/**
 * User model is a JS class that simulates DB User table into class
 * and holds all table attributes.
*/
class User{

    constructor(obj){
        this.user_id = (obj && obj.user_id) ? obj.user_id : null ; 
        this.first_name = (obj && obj.first_name) ? obj.first_name : null ; 
        this.last_name = (obj && obj.last_name) ? obj.last_name : null;
        this.email = (obj && obj.email) ? obj.email : null ; 
        this.password = (obj && obj.password) ? obj.password : null ; 
        this.role = (obj && obj.role) ? obj.role : null ; 
    }
}

module.exports = User;

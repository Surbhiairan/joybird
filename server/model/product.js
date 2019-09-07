
/**
 * Product model is a JS class that simulates DB Product table into class
 * and holds all Product table's attributes.
*/
class Product{

    constructor(obj){
        this.product_id = (obj && obj.product_id) ? obj.product_id : null ; 
        this.product_name = (obj && obj.product_name) ? obj.product_name : null ; 
        this.sizes = (obj && obj.sizes) ? obj.sizes : null;
        this.image_url = (obj && obj.image_url) ? obj.image_url : null ; 
        this.available_quantity = (obj && obj.available_quantity) ? obj.available_quantity : null ; 
        this.category = (obj && obj.category) ? obj.category : null ; 
        this.unit_price = (obj && obj.unit_price) ? obj.unit_price : null ; 
    }
}

module.exports = Product;

class Product {
    constructor(obj,prodId) {
        this.prodId = prodId;
        this.prodName = obj.prodName;
        this.description = obj.description;
        this.typeOfSale = obj.typeOfSale;
        this.specifications = obj.specifications;
        this.price = obj.price;
        this.discountPercentage = obj.discountPercentage;
        this.taxPercentage = obj.taxPercentage;
        this.rentType = obj.rentType;
        this.remainderType = obj.remainderType;
        this.remainderBefore = obj.remainderBefore;
        this.limitOfRemainders = obj.limitOfRemainders;
        this.associatedWith = obj.associatedWith
    }
}

module.exports = Product
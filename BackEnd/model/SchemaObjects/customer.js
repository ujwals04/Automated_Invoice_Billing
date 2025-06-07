//const service = require('../services/services')
class Customer {
    constructor(obj,custId) {
        this.custId = custId;
        this.custName = obj.custName;
        this.custEmail = obj.custEmail;
        this.custPhone = obj.custPhone;
        this.billingAddress = obj.billingAddress;
        this.associatedWith = obj.associatedWith;
        
    }
}

module.exports = Customer

// {
//     "custId":"custId",
//     "custName":"Phaneendra",
//     "custEmail":"customer@gmail.com",
//     "custPhone":"+91 7981402374",
//     "billingAddress":"Infosys gate 2",
//     "associatedWith":"organisationName",
//     "createdAt":"timestamp"
// },
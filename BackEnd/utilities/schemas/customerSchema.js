const mongoose = require('mongoose');
const customerSchema = mongoose.Schema({
    custId:{
        type: String,
        required: true
    },
    custName:{
        type: String,
        required: true
    },
    custEmail:{
        type: String,
        required: true
    },
    custPhone:{
        type: Number,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    associatedWith: {
        type: String,
        required: true
    }
})

module.exports=customerSchema;
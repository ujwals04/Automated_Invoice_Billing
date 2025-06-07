const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    prodId:{
        type: String,
        required: true
    },
    prodName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    typeOfSale:{
        type: String,
        required: true
    },
    specifications: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage:{
        type:Number,
        required:true
    },
    taxPercentage:{
        type:Number,
        required:true
    },
    rentType:{
        type:String
    },
    rentPrice:{
        type:String
    },
    remainderType:{
        type:String
    },
    remainderBefore:{
        type:String
    },
    limitOfRemainders:{
        type:String
    },
    associatedWith:{
        type:String,
        required:true
    }

})

module.exports=productSchema;

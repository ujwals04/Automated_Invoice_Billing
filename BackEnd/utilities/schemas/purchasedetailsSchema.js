const mongoose = require('mongoose');

const purchaseDetailsSchema = mongoose.Schema({
    customerId:{
        type: String,
        required: true
    },
    associatedWithId:{
        type:String,
        required:true
    },
    itemsPurchased:[
        {
            itemId:{
                type:String,
                required:true
            },
            typeOfPurchase:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    purchaseTimeStamp:{
        type:Date,
        required:true
    },
    dueTimeStamp:{
        type:Date,
        required:true
    }

})

module.exports=purchaseDetailsSchema;

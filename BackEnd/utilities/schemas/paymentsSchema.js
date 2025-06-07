const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    invoiceId:{
        type: String,
        required: true
    },
    customerId:{
        type: String,
        required: true
    },
    associatedWithId:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    },
    billedTimeStamp:{
        type:Date,
        required:true
    },
    dueTimeStamp:{
        type:Date,
        required:true
    },
    partialPaymentsDetails:[
        {
            installmentNo:{
                type: String,
                required: true
            },
            amountRecieved:{
                type: Number,
                required: true
            },
            note:{
                type: String,
                required: true
            }
        }
    ]

})

module.exports=paymentSchema;

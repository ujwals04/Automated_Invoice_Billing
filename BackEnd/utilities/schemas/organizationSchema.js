const mongoose = require('mongoose');
const organizationSchema = mongoose.Schema({
    organizationName:{
        type: String,
        required: true
    },
    organizationId:{
        type: String,
        required: true
    },
    industryType:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    postalCode:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo:{
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports=organizationSchema;
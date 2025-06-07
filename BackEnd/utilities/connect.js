const mongoose = require('mongoose');
const organizationSchema = require('./schemas/organizationSchema')
const customerSchema = require('./schemas/customerSchema')
const productSchema = require('./schemas/productSchema')
const invoiceSchema = require('./schemas/invoiceSchema')
const purchaseSchema = require('./schemas/purchasedetailsSchema')
const paymentsSchema = require('./schemas/paymentsSchema')
let x={}
let dbConnection;
x.connectDb=async ()=>{
    try{
        dbConnection=await mongoose.connect(process.env.MONGOURL)
        console.log("Db Connected Succesfully");
    }
    catch(err)
    {
        console.log("Db connected failed due to ",err);
    }
}

x.organizationCollection=async()=>{
    const model = await dbConnection.model("SignUp", organizationSchema)
    return model
}

x.customerCollection=async()=>{
    const model = await dbConnection.model("CustomerTemp",customerSchema);
    return model;
}

x.productCollection=async()=>{
    const model = await dbConnection.model("ProductTemp",productSchema);
    return model;
}

x.purchaseCollection = async()=>{
    const model = await dbConnection.model("PurchaseTemp",purchaseSchema);
    return model;
}

x.invoiceCollection = async()=>{
    const model = await dbConnection.model("invoiceTemp",invoiceSchema);
    return model;
}

x.paymentsCollection = async()=>{
    const model = await dbConnection.model("PaymentsTemp",paymentsSchema);
    return model;
}

module.exports=x;
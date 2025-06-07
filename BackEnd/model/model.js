const connection=require('../utilities/connect')
const bcrypt = require('bcryptjs');
const model = {}

//Perform All db operations here

model.checkOrganization=async(email,pswrd)=>{
    try{
        const users=await connection.organizationCollection()
        

        const user=await users.findOne({email:email})
        
        if(user)
        {
            //console.log(user);
            const isMatch = await bcrypt.compare(pswrd,user.password);
            if(!isMatch){
                let error = new Error("Invalid Credentials");
                error.status = 500;
                throw error;
            }
            return user;
        }
        else{
            let error=new Error("User Not Found");
            error.status=500;
            throw error;
        }
    }
    catch(err)
    {
        let error=new Error(err.message);
        error.status=500;
        throw error;
    }
}
model.getOrganizationById = async(Id)=>{
    try{
        const user = await connection.organizationCollection();
        return await user.findOne({organizationId:Id});
    }
    catch(err){
        let error=new Error(err.message);
        error.status=500;
        throw error;
    }
}
model.registerOrganization=async(newUser)=>{
    try{
        const users=await connection.organizationCollection()
        const hashedPassword = await bcrypt.hash(newUser.password,10);
        newUser.password = hashedPassword;
        const x=await users.insertOne(newUser)
        console.log(x);
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

model.getOrganizations=async()=>{
    try{
        users=await connection.organizationCollection()
        x=users.find()
        //console.log(x);
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


model.registerCustomer= async(custObj)=>{
    try{
        customers = await connection.customerCollection();
        insertRes = await customers.insertOne(custObj);
       
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

model.removeCustomer= async(custId)=>{
    try{
        customers = await connection.customerCollection();
        removeRes = await customers.deleteOne({custId:custId});
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


model.getCustomers= async(associatedWith)=>{
    try{
        customers = await connection.customerCollection();
        allcustomers = await customers.find({associatedWith:associatedWith});
        console.log(allcustomers)
        return allcustomers
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

model.addProduct= async(newProduct)=>{
    try{
        products = await connection.productCollection();
        await products.insertOne(newProduct);
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

model.getProducts= async(associatedWith)=>{
    try{
        products = await connection.productCollection();
        console.log(associatedWith)
        allproducts = await products.find({associatedWith:associatedWith});
        console.log(allproducts)
        return allproducts
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

model.removeProduct= async(prodId)=>{
    try{
        products = await connection.productCollection();
        console.log(prodId)
        removeRes = await products.deleteOne({prodId:prodId})
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


model.makePurchase=async(purchaseObj)=>{
    try{
        purchases = await connection.purchaseCollection();
        purchaseRes = await purchases.insertOne(purchaseObj);
        return purchaseRes;
    }
    catch(error){
        throw error;
    }
}


model.requestPayment=async(newPaymentRequest)=>{
    try{
        payments = await connection.paymentsCollection();
        paymentsRes = await payments.insertOne(newPaymentRequest);
        return paymentsRes;
    }
    catch(error){
        throw error;
    }
}

model.makeTemplate=async(newTemplate)=>{
    try{
        const templatesColl=await connection.templateCollection()
        const x=await templatesColl.insertOne(newTemplate)
        console.log(x);
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


model.generateInvoice=async(invoiceObj)=>{
    try{
        invoices = await connection.invoiceCollection();
        invoicesRes = await invoices.insertOne(invoiceObj);
        return invoicesRes;
    }
    catch(error){
        throw error;
    }
}

model.getNoOfCustomers=async()=>{
    customers = await connection.customerCollection();
    findRes = await customers.find();
    return findRes.length;
}

model.getNoOfOrgs=async()=>{
    orgs = await connection.organizationCollection();
    findRes = await orgs.find();
    return findRes.length;
}

model.getNoOfProducts=async()=>{
    products = await connection.productCollection();
    findRes = await products.find();
    return findRes.length;
}

model.getNoOfInvoices = async()=>{
    try{
        invoices = await connection.invoiceCollection();
        invoicesRes = await invoices.find();
        return invoicesRes.length;
    }
    catch(error){
        throw error;
    }
}

model.getItemById = async(itemId)=>{
    try{
        itemColl = await connection.productCollection();
        itemRes = await itemColl.find({prodId:itemId});
        return itemRes;
    }
    catch(error){
        throw error;
    }
}

model.getInvoice = async(associatedWith)=>{
    try{
        invoices = await connection.invoiceCollection();
        invoicesRes = await invoices.find({associatedWithId:associatedWith});
        return invoicesRes;
    }
    catch(error){
        throw error;
    }
}

model.getInvoices=async(userId)=>{
    try{
        users=await connection.invoiceCollection()
        console.log(userId)
        x=await users.find({customerId:userId})
        console.log(x)
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


module.exports = model
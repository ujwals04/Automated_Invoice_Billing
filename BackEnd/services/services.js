const PDFDocument =require('pdfkit')
const fs =require('fs')
const jwt = require('jsonwebtoken');

const model=require('../model/model')
const Validators=require('../utilities/validator')

const services = {}
const Invoice = require('../model/SchemaObjects/invoice')
const Payment = require('../model/SchemaObjects/payment')


//Write All logics Here(Validations)

//token generation

services.generateAccessToken = ({organizationId,organizationName,email})=>{
    const payload = {
        organizationId,
        organizationName,
        email
    };

    const AccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn :process.env.JWT_EXPIRES_IN});
    return AccessToken;
}

services.generateRefreshToken = ({organizationId,organizationName,email})=>{
    const payload = {
        organizationId,
        organizationName,
        email
    };

    const RefreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn :'1d'});
    return RefreshToken;
}


services.getOrganizationById =async (Id)=>{
    try{
        return await model.getOrganizationById(Id);
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}
services.signIn=async (email,pswrd)=>{
    try
    {
        Validators.validateEmail(email)
        Validators.validatePassword(pswrd)
        y=await model.checkOrganization(email,pswrd)
        return y
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.users=async ()=>{
    try{
        y=await model.getOrganizations();
        return y;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.signUp=async (newUser)=>{
    try
    {
        
        Validators.validateEmail(newUser.email)
        Validators.validatePassword(newUser.password)
        Validators.validateContactNumber(newUser.contactNo)
        return await model.registerOrganization(newUser)
        
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


services.registerCustomer=async(custObj)=>{
    try
    {
        Validators.validateEmail(custObj.custEmail);
        Validators.validateContactNumber(custObj.custPhone);
        await model.registerCustomer(custObj);
        
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.removeCustomer=async(custId)=>{
    try
    {
        await model.removeCustomer(custId);
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


services.getCustomers=async(associatedWith)=>{
    try
    {
        x=await model.getCustomers(associatedWith);
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.addProduct=async(newProduct)=>{
    try
    {
        await model.addProduct(newProduct);
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.makeTemplate=async(newTemplate)=>{
    try
    {
        await model.makeTemplate(newTemplate);
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.getProducts=async(associatedWith)=>{
    try
    {
        console.log(associatedWith)
        x=await model.getProducts(associatedWith);
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.removeProduct=async(prodId)=>{
    try
    {
        x=await model.removeProduct(prodId);
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.generateCustId = async()=>{
    try{
        const noOfCustomers = await model.getNoOfCustomers();
        return "Cust-"+String(noOfCustomers+1);
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
        
    
}


services.generateOrgId = async()=>{
    try{
        const noOfOrgs = await model.getNoOfOrgs();
        return "Org-"+String(noOfOrgs+1);
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
        
    
}


services.generateProdId = async()=>{
    try{
        const noOfProducts = await model.getNoOfProducts();
        return "Prod-"+String(noOfProducts+1);
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
        
    
}

services.makePurchase = async(data)=>{
    try{
        purchaseres=await model.makePurchase(data);
        itemsPurchased=data.itemsPurchased;
        invoiceItems=[]
        for(let item of itemsPurchased)
        {
            itemId=item.itemId
            itemData=await services.getItemById(itemId)
            itemData=itemData[0]
            console.log(itemData)
            itemPrice=(itemData.typeOfSale==='permanent')?(itemData.price*item.quantity):(itemData.price*item.quantity*itemData.rentPrice)
            itemTax=(itemData.taxPercentage/100)*itemData.price
            itemTax=(itemData.typeOfSale==='permanent')?(itemTax*item.quantity):(itemTax*item.quantity*itemData.rentPrice)
            itemDiscount=(itemData.discountPercentage/100)*itemData.price
            itemDiscount=(itemData.typeOfSale==='permanent')?(itemDiscount*item.quantity):(itemDiscount*item.quantity*itemData.rentPrice)
            itemTotal=itemPrice+itemTax-itemDiscount
            invoiceItems.push({
                itemName:itemData.prodName,
                quantity:item.quantity,
                purchaseType:item.typeOfPurchase,
                priceOfTheItem:itemPrice,
                taxOfTheItem:itemTax,
                discountOfTheItem:itemDiscount,
                totalOfTheItem:itemTotal
            })
        }
        totalAmount=totalTaxAmount=totalDiscountAmount=totalPayableAmount=0;

        invoiceItems.forEach(item=>{
            totalAmount+=item.priceOfTheItem
            totalTaxAmount+=item.taxOfTheItem
            totalDiscountAmount+=item.discountOfTheItem
            totalPayableAmount+=item.totalOfTheItem
        })

        let invoiceCount = await model.getNoOfInvoices();
        const invoiceId = "Invoice-"+(invoiceCount+1);

        newInvoice = new Invoice(data,invoiceItems,invoiceId,totalAmount,totalTaxAmount,totalDiscountAmount,totalPayableAmount)
        invoiceRes=await model.generateInvoice(newInvoice)

        services.generateInvoice(newInvoice)

        newPaymentRequest = new Payment(data,invoiceId)
        paymentsRes= await model.requestPayment(newPaymentRequest)


        
        return {"purchaseRes":purchaseres,"invoiceRes":invoiceRes,"paymentsRes":paymentsRes};
    }
    catch(err){
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

services.getItemById =  async (itemId)=>{
    try{
        const itemwithId=await model.getItemById(itemId)
        return itemwithId
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


services.getInvoice=async(associatedWith)=>{
    try
    {
        console.log(associatedWith)
        x=await model.getInvoice(associatedWith);
        return x;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}


services.getUserInvoices=async (userId)=>{
    try{
        y=await model.getInvoices(userId);
        return y;
    }
    catch(err)
    {
        let error=new Error(err);
        error.status=500;
        throw error;
    }
}

// services.generateInvoice = async(data)=>{
//     try{
//         const {items, tax=0, dueDate,discount = 0}=data;
//         let invoiceCount = await model.getNoOfInvoices();
//         const invoiceNumber = "Invoice-"+invoiceCount;
//         let subtotal = 0;

//         items.forEach(item =>{
//             switch(item.type){
//                 case 'purchase':
//                     subtotal += item.unitPrice * (item.quantity || 1);
//                     break;
//                 case 'rental':
//                     subtotal += item.unitPrice * (item.duration || 1);
//                     break;
//                 case 'subscription':
//                     subtotal += item.unitPrice * (item.duration || 1);
//                     break;
//             }
//         });
//         const subTotal = subtotal;
//         const taxAmount = (tax/100)*subtotal;
//         const discountAmount  = (discount/100)*subtotal;
//         const totalAmount = subtotal + taxAmount - discountAmount;


//         const invoiceObj = new Invoice(data, invoiceNumber, subTotal,taxAmount,discountAmount,totalAmount);

//         return await model.generateInvoice(invoiceObj);
//     }
//     catch(error){
//         throw error;
//     }
// }

services.generateInvoice=async(filePathy)=>{
  const doc = new PDFDocument({ margin: 50 });
//   path='../Invoices'
  const filePath = `../FrontEnd/src/assets/invoices/${invoiceRes.invoiceId}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));


  // Set Monospaced Font for proper alignment
  doc.font('Courier');

  // Header
  doc
    .fontSize(20)
    .text('INVOICE', { align: 'center' })
    .moveDown(2);

  // Invoice Metadata
  doc
    .fontSize(12)
    .text(`Invoice ID:        ${invoiceRes.invoiceId}`)
    .text(`Customer ID:       ${invoiceRes.customerId}`)
    .text(`Organization ID:   ${invoiceRes.associatedWithId}`)
    .text(`Purchase Date:     ${new Date(invoiceRes.purchaseTimeStamp).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`)
    .text(`Invoice Generated: ${new Date(invoiceRes.invoiceGenerationTimeStamp).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`)
    .text(`Due Date:          ${new Date(invoiceRes.dueTimeStamp).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`)
    .moveDown(1);

  // Items header
  doc.text('Items:');
  doc
    .text('--------------------------------------------------------------------')
    .text('| Item Name | Qty | Type      | Price   | Tax   | Discount | Total |')
    .text('---------------------------------------------------------------------');

  // Each item
  invoiceRes.items.forEach(item => {
    console.log(item)
    const row = `| ${item.itemName.padEnd(9)} | ${String(item.quantity).padEnd(3)} | ${item.purchaseType.padEnd(9)} | ₹${item.priceOfTheItem.toString().padEnd(6)} | ₹${item.taxOfTheItem.toString().padEnd(4)} | ₹${item.discountOfTheItem.toString().padEnd(4)} | ₹${item.totalOfTheItem.toString().padEnd(5)} |`;
    doc.text(row);
  });

  // Bottom border
  doc.text('---------------------------------------------------------------------').moveDown(2);

  // Summary
  doc
    .text(`Subtotal:          ₹${invoiceRes.totalAmount}`)
    .text(`Total Tax:         ₹${invoiceRes.totalTaxAmount}`)
    .text(`Total Discount:    ₹${invoiceRes.totalDiscountAmount}`)
    .text('----------------------------------------')
    .font('Courier-Bold')
    .text(`Amount Due:        ₹${invoiceRes.toBePaidAmount}`)
    .font('Courier')
    .moveDown(2);

  // Footer
  doc
    .fontSize(10)
    .fillColor('#888888')
    .text('Thank you for your business!', { align: 'center' });

  doc.end();
  console.log(`PDF saved as ${filePath}`);




  const doc1 = new PDFDocument({ margin: 50 });
//   path='../Invoices'
  const filePath1 = `../UserDummyWebsite/UserApp/src/assets/invoices/${invoiceRes.invoiceId}.pdf`;
  doc1.pipe(fs.createWriteStream(filePath1));


  // Set Monospaced Font for proper alignment
  doc1.font('Courier');

  // Header
  doc1
    .fontSize(20)
    .text('INVOICE', { align: 'center' })
    .moveDown(2);

  // Invoice Metadata
  doc1
    .fontSize(12)
    .text(`Invoice ID:        ${invoiceRes.invoiceId}`)
    .text(`Customer ID:       ${invoiceRes.customerId}`)
    .text(`Organization ID:   ${invoiceRes.associatedWithId}`)
    .text(`Purchase Date:     ${new Date(invoiceRes.purchaseTimeStamp).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`)
    .text(`Invoice Generated: ${new Date(invoiceRes.invoiceGenerationTimeStamp).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`)
    .text(`Due Date:          ${new Date(invoiceRes.dueTimeStamp).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })}`)
    .moveDown(1);

  // Items header
  doc1.text('Items:');
  doc1
    .text('--------------------------------------------------------------------')
    .text('| Item Name | Qty | Type      | Price   | Tax   | Discount | Total |')
    .text('---------------------------------------------------------------------');

  // Each item
  invoiceRes.items.forEach(item => {
    console.log(item)
    const row = `| ${item.itemName.padEnd(9)} | ${String(item.quantity).padEnd(3)} | ${item.purchaseType.padEnd(9)} | ₹${item.priceOfTheItem.toString().padEnd(6)} | ₹${item.taxOfTheItem.toString().padEnd(4)} | ₹${item.discountOfTheItem.toString().padEnd(4)} | ₹${item.totalOfTheItem.toString().padEnd(5)} |`;
    doc1.text(row);
  });

  // Bottom border
  doc1.text('---------------------------------------------------------------------').moveDown(2);

  // Summary
  doc1
    .text(`Subtotal:          ₹${invoiceRes.totalAmount}`)
    .text(`Total Tax:         ₹${invoiceRes.totalTaxAmount}`)
    .text(`Total Discount:    ₹${invoiceRes.totalDiscountAmount}`)
    .text('----------------------------------------')
    .font('Courier-Bold')
    .text(`Amount Due:        ₹${invoiceRes.toBePaidAmount}`)
    .font('Courier')
    .moveDown(2);

  // Footer
  doc1
    .fontSize(10)
    .fillColor('#888888')
    .text('Thank you for your business!', { align: 'center' });

  doc1.end();
  console.log(`PDF saved as ${filePath}`);
}

module.exports = services
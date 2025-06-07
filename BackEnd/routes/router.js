const service = require('../services/services')
const Organization = require('../model/SchemaObjects/organization');
const Customer = require('../model/SchemaObjects/customer');
const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../model/SchemaObjects/product');
const Purchase = require('../model/SchemaObjects/purchase');
const services = require('../services/services');
const Template = require('../model/SchemaObjects/template');
const router = express.Router();


//All routing logics


//used for organization login

router.post('/signin',async (req,res,next)=>{
    try{
        const receivedOrganizationData=await service.signIn(req.body.email,req.body.password);

        const accessToken =  services.generateAccessToken({organizationId:receivedOrganizationData.organizationId,
            organizationName:receivedOrganizationData.organizationName,
            email:receivedOrganizationData.email
        });

        const refreshToken = services.generateRefreshToken({organizationId:receivedOrganizationData.organizationId,
            organizationName:receivedOrganizationData.organizationName,
            email:receivedOrganizationData.email
        });

        const sendingOrganizationData = {
            organizationId : receivedOrganizationData.organizationId,
            organizationName:receivedOrganizationData.organizationName,
            industryType: receivedOrganizationData.industryType,
            country: receivedOrganizationData.country,
            postalCode: receivedOrganizationData.postalCode,
            address: receivedOrganizationData.address,
            email: receivedOrganizationData.email,
            contactNo: receivedOrganizationData.contactNo
        }

        console.log(receivedOrganizationData);
        
        res
        .setHeader("Access-Control-Expose-Headers","Authorization")
        .cookie('refreshToken', refreshToken, {httpOnly:true ,sameSite:'strict',secure:false,maxAge:7*24*60*1000})
        .header('Authorization',accessToken)
        .send(sendingOrganizationData);
    }
    catch(err)
    {
        next(err)
    }
})


router.get('/getUsers',async(req,res,next)=>{
    try{
        x=await service.users()
        res.send(x)
    }
    catch(err)
    {
        next(err)
    }
})


//used for registering an organization

router.post('/signup',async (req,res,next)=>{
    try{
        const orgId=await service.generateOrgId();
        const newUser= new Organization(req.body,orgId);
        const receivedOrganizationData=await service.signUp(newUser);

        const accessToken =  services.generateAccessToken({organizationId:receivedOrganizationData.organizationId,
            organizationName:receivedOrganizationData.organizationName,
            email:receivedOrganizationData.email
        });

        const refreshToken = services.generateRefreshToken({organizationId:receivedOrganizationData.organizationId,
            organizationName:receivedOrganizationData.organizationName,
            email:receivedOrganizationData.email
        });

        const sendingOrganizationData = {
            organizationId : receivedOrganizationData.organizationId,
            organizationName:receivedOrganizationData.organizationName,
            industryType: receivedOrganizationData.industryType,
            country: receivedOrganizationData.country,
            postalCode: receivedOrganizationData.postalCode,
            address: receivedOrganizationData.address,
            email: receivedOrganizationData.email,
            contactNo: receivedOrganizationData.contactNo
        }

        console.log(receivedOrganizationData+"received ");
        res
        .setHeader("Access-Control-Expose-Headers","Authorization")
        .cookie('refreshToken', refreshToken, {httpOnly:true ,sameSite:'strict',secure:false,maxAge:7*24*60*1000})
        .header('Authorization',accessToken)
        .send(sendingOrganizationData);
    }
    catch(err)
    {
        next(err)
    }
})

router.get('/refresh-token',async (req,res,next)=>{
    try{
        const refresToken = req.cookies.refreshToken;
        //console.log(refresToken);
        if(!refresToken){
            return res.status(401).json({message:"No refresh token found"});
        }
        jwt.verify(refresToken,process.env.JWT_SECRET,async (err,decoded)=>{
            if(err){
                return res.status(403).json({message:"Invalid response token"});
            }
            const receivedOrganizationData = await services.getOrganizationById(decoded.organizationId);

            if(!receivedOrganizationData){
                return res.status(404).json({message:"User not found"})
            }
            const accessToken =  services.generateAccessToken({organizationId:receivedOrganizationData.organizationId,
                organizationName:receivedOrganizationData.organizationName,
                email:receivedOrganizationData.email
            });
            const newrefreshToken = services.generateRefreshToken({organizationId:receivedOrganizationData.organizationId,
                organizationName:receivedOrganizationData.organizationName,
                email:receivedOrganizationData.email
            });
            const sendingOrganizationData = {
                organizationId : receivedOrganizationData.organizationId,
                organizationName:receivedOrganizationData.organizationName,
                industryType: receivedOrganizationData.industryType,
                country: receivedOrganizationData.country,
                postalCode: receivedOrganizationData.postalCode,
                address: receivedOrganizationData.address,
                email: receivedOrganizationData.email,
                contactNo: receivedOrganizationData.contactNo
            }
            res
            .setHeader("Access-Control-Expose-Headers","Authorization")
            .cookie('refreshToken', newrefreshToken, {httpOnly:true ,sameSite:'strict',secure:false,maxAge:7*24*60*1000})
            .header('Authorization',accessToken)
            .send(sendingOrganizationData);

        });

        
    }
    catch(error){
        next(error);
    }
})


//logout 

router.post('/logout',(req,res,next)=>{
    res.clearCookie('refreshToken',{
        httpOnly:true,
        sameSite:'strict',
        secure:false
    });

    res.status(200).send({message:'Logged Out Successfully'});
})
//used for adding a customer

router.post('/addCustomer',async(req,res,next)=>{
    try{

        custId=await service.generateCustId();
        console.log(typeof(custId))
        const newCustomer = new Customer(req.body,custId);
        console.log(newCustomer);
        await service.registerCustomer(newCustomer);
        res.send(newCustomer);
    }
    catch(err){
        next(err);
    }
})

//used for retrieving cutsomers based on their associatedOrganization
router.get('/getCustomers/:associatedWith',async(req,res,next)=>{
    try{
        x=await service.getCustomers(req.params.associatedWith);
        res.send(x);
    }
    catch(err){
        next(err);
    }
})

router.delete('/removeCustomer/:custId',async(req,res,next)=>{
    try{
        x=await service.removeCustomer(req.params.custId);
        res.send({"message":"Customer Removed Successfully"});
    }
    catch(err){
        next(err);
    }
})

//add new Products to Particular Organization

router.post('/addProduct',async(req,res,next)=>{
    try{
        prodId=await service.generateProdId();
        const newProduct = new Product(req.body,prodId);
        console.log(newProduct);
        await service.addProduct(newProduct);
        res.send(newProduct);
    }
    catch(err){
        next(err);
    }
})

router.get('/getProducts/:associatedWith',async(req,res,next)=>{
    try{
        x=await service.getProducts(req.params.associatedWith);
        res.send(x);
    }
    catch(err){
        next(err);
    }
})


router.delete('/removeProduct/:prodId',async(req,res,next)=>{
    try{
        x=await service.removeProduct(req.params.prodId);
        res.send(x);
    }
    catch(err){
        next(err);
    }
})

router.post('/makePurchase',async(req,res,next)=>{
    try{
        const newPurchase = new Purchase(req.body);
        const purchase = await service.makePurchase(newPurchase);
        res.json({message:"Purchase Done",purchase});
    }
    catch(error){
        next(error);
    }
})


// router.post('/createInvoice',async(req,res,next)=>{
//     try{
//         const invoice = await service.generateInvoice(req.body);
//         res.json({message:"Invoice Created",invoice});
//     }
//     catch(error){
//         next(error);
//     }
// })

router.get('/getInvoice/:associatedWith',async(req,res,next)=>{
    try{
        const invoices = await service.getInvoice(req.params.associatedWith);
        res.send(invoices);
    }
    catch(error){
        next(error);
    }
})

router.get('/service/:UserId',async (req,res,next)=>{
    try{
        y=await service.getUserInvoices(req.params.UserId)
        res.send(y)
    }
    catch(err)
    {
        next(err.message)
    }
})

router.get('/template',async (req,res,next)=>{
    try{
        const newTemplate = new Template(req.body);
        const template = await service.makeTempplate(newTemplate);
        res.json({message:"Purchase Done",template});
    }
    catch(err)
    {
        next(err.message)
    }
})
module.exports=router;
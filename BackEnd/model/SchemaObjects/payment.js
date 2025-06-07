class Payment{
    constructor(purchaseObj,invoiceId){
        this.invoiceId=invoiceId
        this.associatedWithId=purchaseObj.associatedWithId
        this.customerId=purchaseObj.customerId
        this.billedTimeStamp=purchaseObj.purchaseTimeStamp
        this.dueTimeStamp=purchaseObj.dueTimeStamp
        this.paymentStatus="Unpaid"
    }
}

module.exports = Payment;
class Invoice{
    constructor(purchaseObj,invoiceItems,invoiceId, totalAmount,totalTaxAmount,totalDiscountAmount,totalPayableAmount){
        this.invoiceId= invoiceId;
        this.customerId = purchaseObj.customerId;
        this.associatedWithId = purchaseObj.associatedWithId;
        this.purchaseTimeStamp = purchaseObj.purchaseTimeStamp
        this.invoiceGenerationTimeStamp = new Date;
        this.dueTimeStamp = purchaseObj.dueTimeStamp;
        this.items = invoiceItems
        this.totalAmount = totalAmount;
        this.totalTaxAmount = totalTaxAmount;
        this.totalDiscountAmount = totalDiscountAmount;
        this.toBePaidAmount = totalPayableAmount;
    }
}

module.exports = Invoice;
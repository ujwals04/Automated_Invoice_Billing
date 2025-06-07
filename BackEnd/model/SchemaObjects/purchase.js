class Purchase{
    constructor(purchaseObj){
        this.customerId = purchaseObj.customerId;
        this.associatedWithId = purchaseObj.associatedWithId;
        this.itemsPurchased = purchaseObj.itemsPurchased;
        this.purchaseTimeStamp = purchaseObj.purchaseTimeStamp;
        this.dueTimeStamp = purchaseObj.dueTimeStamp;
        
    }
}

module.exports = Purchase;
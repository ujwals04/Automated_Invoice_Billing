class User {
    constructor(obj,orgId) {
        this.organizationName = obj.organizationName
        this.organizationId=orgId
        this.industryType = obj.industryType
        this.country = obj.country
        this.postalCode = obj.postalCode
        this.address = obj.address
        this.email = obj.email
        this.contactNo = obj.contactNo
        this.password = obj.password
    }
}

module.exports = User
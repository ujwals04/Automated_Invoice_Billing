class Template{
    constructor(templateObj){
        this.id=templateObj.id,
        this.name=templateObj.name,
        this.description=templateObj.description,
        this.thumbnailUrl=templateObj.thumbnailUrl,
        this.primaryColor=templateObj.primaryColor,
        this.secondaryColor=templateObj.secondaryColor,
        this.fontFamily=templateObj.fontFamily,
        this.style=templateObj.style
    }
}

module.exports = Template;
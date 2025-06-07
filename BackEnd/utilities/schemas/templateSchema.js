const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
    id: {
        type:string},
    name: string;
    description: string;
    thumbnailUrl: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    style: 'modern' | 'classic' | 'minimal' | 'corporate' | 'custom';
    customHtml?: string;
    customCss?: string;

})

module.exports=templateSchema;

const fs = require('fs')

const requestLogger = (req, res, next) => {
    data=new Date()+req.method+"\n";
    fs.appendFile("RequestLogger.txt",data,(error)=>{
        if(error)
        {
            console.log("Unable to write error in logger")
        }
        else
        {
            next();
        }
    })
}
module.exports=requestLogger
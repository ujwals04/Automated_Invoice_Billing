const fs = require('fs')

const errorLogger = (err,req,res,next) => {
    if(err)
    {
        data=err.message+err.stack+"\n";
        fs.appendFile("ErrorLogger.txt",data,(error)=>{
            if(error)
            {
                console.log("Unable to write error in logger")
            }
            else
            {
                next();
            }
        })
        if(err.status){
            res.status(err.status);
        }
        else{
            res.status(500);
        }
        
        res.send(err.message);

    }
};

module.exports = errorLogger;
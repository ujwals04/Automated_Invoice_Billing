

const Validator={};


// o Organization Name

// o Industry Type

// o Location

// o Contact Number

// o Email

// o Password
const errFun=(msg)=>{
    const error = new Error(msg);
    throw error;
}
Validator.validateEmail=(email)=>{
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!emailRegex.test(email)){
        errFun("Invlaid Email");
    }
}

Validator.validatePassword=(password)=>{
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[^(A-Za-z0-9)]/;
    //console.log(password)
    if(password.length < 6){
        errFun("Password must be atleast 6 characters long");
    }

    if(!upperCase.test(password)){
        errFun("Password must contain atleast one capital letter");
    }
    if(!lowerCase.test(password)){
        errFun("Password must contain atleast one small letter");
    }
    if(!number.test(password)){
        errFun("Password must contain atleast one number");
    }
    if(!specialChar.test(password)){
        errFun("Password must contain atleast one special Character");
    }
}


Validator.validateContactNumber=(contactNum)=>{

    const contactRegex =/^\d{10}$/;
    if(!contactRegex.test(contactNum)){
        errFun("Invlid contact Number.");
    }
    
}

// try{
//     Validator.validateContactNumber("aaaaaaaaaa");
// }
// catch(e){
//     console.log(e.message);
// }

module.exports=Validator;
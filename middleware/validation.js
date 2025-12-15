const validation=(schema)=>{

    return(req,res,next)=>{
        const {error}=schema.validate(req.body,{abortEarly:false,allowUnknown:false, stripUnknown:true});

        if (error){
        const details=error.details.map((d)=>d.message);
        return res.status(400).json({message:"validation error",data:details})
    }

    next();
    }
    

    
}

module.exports=validation;


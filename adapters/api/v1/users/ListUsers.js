import tomato from "tomato-x";
import serv from "../../app.js";

export const register = tomato.NewRegister({
    method:"GET",
    process:(req,res)=>{
        tomato.buildResponse(res,{data:serv.listUsers(),message:"Users listed sucessfuly",status:202})
    },
    caseError:(err,res)=>{
        tomato.buildResponse(res,{message:err.message,status:500})
    }
})
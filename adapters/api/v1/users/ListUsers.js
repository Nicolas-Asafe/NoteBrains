import tomato from "tomato-x";
import serv from "../../app.js";
import xapikey_middleware from "../../_midlewares/xapikey_middleware.js";

export const register = tomato.NewRegister({
    method:"GET",
    middlewares:[xapikey_middleware],
    path:"/",
    process:(req,res)=>{
        tomato.buildResponse(res,{data:serv.listUsers(),message:"Users listed sucessfuly",status:202})
    },
    caseError:(err,res)=>{
        tomato.buildResponse(res,{message:err.message,status:500})
    }
})
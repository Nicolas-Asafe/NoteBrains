import tomato from "tomato-x";
import serv from "../../app.js";
import xapikey_middleware from "../../_midlewares/xapikey_middleware.js";

export const register = tomato.NewRegister({
    method:"GET",
    middlewares:[xapikey_middleware],
    path:"/",
    process:(req,res)=>{
        const users = serv.listUsers().map(u=>(
            {name:u.name,orgs:u.orgs}
        ))
        tomato.buildResponse(res,{
            data:users,
            message:"Users listed sucessfuly",
            status:202
        })
    },
    caseError:(err,res)=>{
        tomato.buildResponse(res,{message:"erro for list users",data:err.message,status:500})
    }
})
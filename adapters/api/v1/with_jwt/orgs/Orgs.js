import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";


export const register = tomato.NewRegister({
    paht:"/",
    caseError:(err,req,res)=>{
        tomato.buildResponse(res,{message:'error for register',data:err.message,status:500})
    },
    process:(req,res)=>{
        const user = serv.searchUserByEmail(req.user.email)
        const orgs = user.orgs
        tomato.buildResponse(res,{
            message:"Orgs listed sucessfully",
            status:200,
            data:orgs
        })
    }
})
import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";

export const register =  tomato.NewRegister({
    caseError:(err,req,res)=>{
        tomato.buildResponse(res,{message:'erro for list org',data:err.message,status:500})
    },
    path:"/:id",
    process:(req,res)=>{
        const orgId = parseInt(req.params.id)
        const userId = serv.searchUserByEmail(req.user.email).id
        const org = servOrgs.getOrgById(userId,orgId)
        if(!org) throw new Error("org not found")
        tomato.buildResponse(res,{
            message:"Org listed sucessfully",
            data:org,
            status:200
        })
    }
})
import tomato from "tomato-x";
import serv from '../../../app.js'
import jwt_middleware from "../../../_midlewares/jwt_middleware.js";

export const register = tomato.NewRegister({
    middlewares:[jwt_middleware],
    path:"/",
    caseError:(err,req,res)=>{
        tomato.buildResponse(res,{message:err.message,status:500})
    },
    process:(req,res)=>{
        const AllOfUser = serv.searchUserByEmail(req.user.email)
        tomato.buildResponse(res,
            {message:"User listed sucessfully",data:{user:AllOfUser}
        })
    }
})


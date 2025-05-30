import tomato from "tomato-x";
import serv from '../../../app.js'
import jwt_middleware, { user } from "../../../_midlewares/jwt_middleware.js";

let AllOfUser
export const register = tomato.NewRegister({
    middlewares:[jwt_middleware],
    process:(req,res)=>{
        AllOfUser = serv.searchUserByEmail(user.email)
        tomato.buildResponse(res,
            {message:"User listed sucessfully",data:{user:AllOfUser}
        })
    }
})

export {AllOfUser}

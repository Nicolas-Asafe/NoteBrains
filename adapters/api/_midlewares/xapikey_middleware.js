import dotenv from 'dotenv'
import tomato from 'tomato-x'
dotenv.config()

export default (req, res, next) => {
    const xapikey = req.headers['x-api-key']
    
    if (!xapikey) {
        tomato.buildResponse(res, {
            message: "x-api-key não fornecida",
            status: 500
        })
        return; 
    }

    if (xapikey != process.env.KEY_ACCESS){
        tomato.buildResponse(res, {
            message: "x-api-key incorreta",
            status: 500
        })
        return;
    }

    next()
}

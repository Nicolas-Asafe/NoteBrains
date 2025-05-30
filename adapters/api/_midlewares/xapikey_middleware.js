import dotenv from 'dotenv'
dotenv.config()


export default (req, res, next) => {
    const xapikey = req.headers['x-api-key']
    if (!xapikey) {
        tomato.buildResponse(res, {
            message: "x-api-key not exists",
            status: 500
        })
        return; 
    }
    if (xapikey != process.env.KEY_ACCESS){
        tomato.buildResponse(res, {
            message: "x-api-key is incorrect",
            status: 500
        })
        return;
    }
    next()
}
import tomato from "tomato-x";
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    const auth = req.headers["authorization"] || "";
    const token = auth.split(" ")[1];

    if (!token) {
        return tomato.buildResponse(res, {
            message: "token not found",
            status: 500
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY_ACCESS_JWT);

        req.user = decoded; 
        next();
    } catch (err) {
        return tomato.buildResponse(res, {
            message: "Token is invalid or expired",
            status: 401,
            data: err.message
        });
    }
};

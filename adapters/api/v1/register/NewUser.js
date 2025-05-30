import tomato from "tomato-x";
import serv from "../../app.js";

export const register = tomato.NewRegister({
    method: "POST",

    caseError: (err, res) => {
        tomato.buildResponse(res, {
            message: "Error while creating user",
            status: 500,
            data: { error: err.message } 
        });
    },

    process: (req, res) => {
        const body = req.body;

        if (!body || !body.name || !body.password || !body.email) {
            tomato.buildResponse(res, {
                message: "Missing credentials: name, password, and email are required.",
                status: 400 
            });
            return;
        }

        serv.newUser(body);

        tomato.buildResponse(res, {
            message: "User created successfully",
            status: 201, 
            data: {
                name: body.name,
                email: body.email
            }
        });
    }
});

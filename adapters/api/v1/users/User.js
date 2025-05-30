import tomato from "tomato-x";
import serv from "../../app.js"; 

const register = tomato.NewRegister({
    method: "GET",
    path:"/:id",         
    process: (req, res) => {
        const id = req.params.id;

        if (!id) {
            tomato.buildResponse(res, {
                message: "Enter the user id on the params",
                status: 400, 
            });
            return;
        }

        try {
            const user = serv.searchUserById(parseInt(id));

            tomato.buildResponse(res, {
                message: "User listed successfully",
                data: {
                    nameUser:user.name,
                    orgs:user.orgs
                },
                status: 200,
            });
        } catch (err) {
            tomato.buildResponse(res, {
                message: err.message,
                status: 500,
            });
        }
    },

    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: err.message,
            status: 500,
        });
    }
});

export { register };

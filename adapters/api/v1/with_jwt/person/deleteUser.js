import tomato from "tomato-x";
import serv from "../../../app.js";
import {AllOfUser} from './me.js'


export const register = tomato.NewRegister({
    method: "DELETE",
    process: (req, res) => {
        const id = AllOfUser.id;

        if (!id) {
            tomato.buildResponse(res, {
                message: "id not found",
                status: 400, 
            });
            return;
        }

        try {
            serv.deleteUser(parseInt(id));

            tomato.buildResponse(res, {
                message: "User deleted successfully",
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
})
import tomato from "tomato-x";
import serv from "../../../app.js";

export const register = tomato.NewRegister({
    method: "DELETE",
    process: (req, res) => {
        const id = serv.searchUserByEmail(req.user.email).id;

        if (id === undefined || id === null) {
            throw new Error("id not found")
        }

        serv.deleteUser(parseInt(id));

        tomato.buildResponse(res, {
            message: "User deleted successfully",
            status: 200,
        });
    },

    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: 'erro for delete user',
            status: 500,
            data: err.message
        });
    }
})
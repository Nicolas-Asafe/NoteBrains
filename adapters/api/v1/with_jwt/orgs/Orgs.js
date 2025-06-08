import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";

export const register = tomato.NewRegister({
    path: "/",
    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: "Erro ao listar organizações",
            data: err.message,
            status: 500
        });
    },
    process: (req, res) => {
        const user = serv.searchUserByEmail(req.user.email);
        if (!user) {
            tomato.buildResponse(res, {
                message: "Usuário não encontrado",
                status: 404
            });
            return;
        }
        const orgs = user.orgs || [];
        tomato.buildResponse(res, {
            message: "Organizações listadas com sucesso",
            status: 200,
            data: orgs
        });
    }
});

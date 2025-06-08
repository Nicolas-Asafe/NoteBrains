import tomato from "tomato-x";
import serv from '../../../app.js'
import jwt_middleware from "../../../_midlewares/jwt_middleware.js";

export const register = tomato.NewRegister({
    middlewares: [jwt_middleware],
    path: "/",
    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: "Erro ao listar seu perfil, tenta de novo aí",
            data: err.message,
            status: 500
        });
    },
    process: (req, res) => {
        const user = serv.searchUserByEmail(req.user.email);
        
        if (!user) {
            tomato.buildResponse(res, {
                message: "Usuário não encontrado, bora registrar!",
                status: 404
            });
            return;
        }

        tomato.buildResponse(res, {
            message: "Perfil do usuário encontrado com sucesso 👌",
            data: { user },
            status: 200
        });
    }
});

import tomato from "tomato-x";
import serv from "../../../app.js";

export const register = tomato.NewRegister({
    method: "DELETE",
    process: (req, res) => {
        try {
            const user = serv.searchUserByEmail(req.user.email);
            if (!user || user.id === undefined || user.id === null) {
                throw new Error("ID do usuário não encontrado");
            }

            serv.deleteUser(parseInt(user.id));

            tomato.buildResponse(res, {
                message: "Usuário deletado com sucesso, sem dó nem piedade!",
                status: 200,
            });
        } catch (err) {
            tomato.buildResponse(res, {
                message: "Erro ao deletar usuário",
                status: 500,
                data: err.message,
            });
        }
    },

    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: "Erro ao deletar usuário (catch geral)",
            status: 500,
            data: err.message,
        });
    }
});

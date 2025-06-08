import tomato from "tomato-x";
import serv from "../../app.js"; 

const register = tomato.NewRegister({
    method: "GET",
    path:"/:id",         
    process: (req, res) => {
        const id = req.params.id;

        if (!id) {
            tomato.buildResponse(res, {
                message: "Informe o ID do usuário nos parâmetros",
                status: 400, 
            });
            return;
        }

        try {
            const user = serv.searchUserById(parseInt(id));

            tomato.buildResponse(res, {
                message: "Usuário listado com sucesso",
                data: {
                    nameUser: user.name,
                    orgs: user.orgs
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
            message: "Erro ao listar o usuário",
            data: err.message,
            status: 500,
        });
    }
});

export { register };

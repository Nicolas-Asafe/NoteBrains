import bcrypt from 'bcrypt'
import tomato from "tomato-x";
import serv from "../../app.js";

export const register = tomato.NewRegister({
    method: "POST",
    path:"/register",
    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: "Erro ao criar o usuário",
            status: 500,
            data: err.message  
        });
    },

    process: async (req, res) => {
        const body = req.body;

        if (!body || !body.name || !body.password || !body.email) {
            throw new Error("Credenciais ausentes: nome, senha e e-mail são obrigatórios.")
        }

        const hashPassword = await bcrypt.hash(body.password, 10)
        body.password = hashPassword
        serv.newUser(body);

        tomato.buildResponse(res, {
            message: "Usuário criado com sucesso",
            status: 201, 
            data: {
                name: body.name,
                email: body.email
            }
        });
    }
});

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import tomato from 'tomato-x'
import serv from '../../app.js'

export const register = tomato.NewRegister({
    method: "POST",
    path:"/login",
    process: async (req, res) => {
        const body = req.body

        if (!body || !body.email || !body.password) {
            throw new Error("Credenciais ausentes (email e senha)")
        }
        
        const user = serv.searchUserByEmail(body.email)
        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const match = await bcrypt.compare(body.password, user.password)
        if (!match) {
            throw new Error("Senha inválida")
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.KEY_ACCESS_JWT,
            { expiresIn: "48h" }
        )

        tomato.buildResponse(res, {
            message: "Login realizado com sucesso",
            status: 200,
            data: { token }
        })
    },
    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: "Erro durante o login",
            status: 500,
            data: err.message
        })
    }
})

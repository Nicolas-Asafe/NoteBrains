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
            return tomato.buildResponse(res, {
                message: "Credentials are missing (email, password)",
                status: 400
            })
        }
        const user = serv.searchUserByEmail(body.email)
        if (!user) {
            return tomato.buildResponse(res, {
                message: "User not found",
                status: 404
            })
        }
        const match = await bcrypt.compare(body.password, user.password)
        if (!match) {
            return tomato.buildResponse(res, {
                message: "Invalid password",
                status: 401
            })
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.KEY_ACCESS_JWT,
            { expiresIn: "48h" }
        )

        tomato.buildResponse(res, {
            message: "Login successful",
            status: 200,
            data: { token }
        })
    },
    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: "Error during login",
            status: 500,
            data: err.message
        })
    }
})

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
                throw new Error("Credentials are missing (email, password)")
        }
        
        const user = serv.searchUserByEmail(body.email)
        if (!user) {
            throw new Error("User not found")
        }
        const match = await bcrypt.compare(body.password, user.password)
        if (!match) {
            throw new Error("Invalid password")
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

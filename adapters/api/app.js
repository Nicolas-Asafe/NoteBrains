import tomato from "tomato-x";
import userService from '../../core/services/userService.js'
import repositoryMemory from '../repositorys/memoryRepo/memoryRepo.js'
import xapikey_middleware from "./_midlewares/xapikey_middleware.js";
import cors from 'cors'
import jwt_middleware from "./_midlewares/jwt_middleware.js";

const api = new tomato.Group("api")
const v1 = new tomato.Group("/v1")
const users = new tomato.Group("/users")
const withjwt = new tomato.Group("/me")

const repo = new repositoryMemory()
const serv = new userService(repo)

api.use(cors())
api.use(xapikey_middleware)
withjwt.use(jwt_middleware)

users.autoLoadRoutesFrom("./v1/users")
withjwt.autoLoadRoutesFrom("./v1/with_jwt")
v1.autoLoadRoutesFrom("./v1/login")
v1.autoLoadRoutesFrom("./v1/register")

v1.addGroup(users)
v1.addGroup(withjwt)
api.addGroup(v1)

new tomato.Server({
    PORT: 3000,
    groups: [api]
})

export default serv

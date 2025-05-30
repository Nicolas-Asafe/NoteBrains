import tomato from "tomato-x";
import userService from '../../core/services/userService.js'
import repositoryMemory from '../repositorys/memoryRepo/memoryRepo.js'

const api = new tomato.Group("api")
const repo = new repositoryMemory()
const serv = new userService(repo)


api.autoLoadRoutesFrom("")

new tomato.Server({
    PORT:3000,
    groups:[api]
})

export default serv
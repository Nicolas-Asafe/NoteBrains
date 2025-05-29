import User from "../entitys/user.js"

export default class UserService{
    #repo
    constructor(repo){
        this.#repo = repo
    }
    newUser(data){
        if(!data.name || !data.password || !data.email){
            throw new Error("credentials is missing")
        }
        const newUser = new User(data)
        this.#repo.save(newUser)
    }
}
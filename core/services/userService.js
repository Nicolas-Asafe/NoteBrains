import User from "../entitys/user.js"

export default class UserService {
    #repo
    constructor(repo) {
        this.#repo = repo
    }
    newUser(data) {
        if (!data.name || !data.password || !data.email) {
            throw new Error("credentials is missing")
        }
        const newUser = new User(data)
        this.#repo.save(newUser)
    }
    deleteUser(id) {
        if (id === undefined || id === null) throw new Error("Enter the user id for delete")
        this.#repo.remove(id)
    }
    listUsers() {
        return this.#repo.find()
    }
    searchUserById(id) {
        if (id === undefined || id === null) throw new Error("Enter the user id for find the user")
        return this.#repo.findOne(id)
    }
    edit(newUser) {
        if (newUser.id === undefined || newUser.id === null) throw new Error("Enter the user id for update the user")
        this.#repo.update(newUser)
    }
    addOrgById(userId, org) {
        const user = this.searchUserById(userId);
        user.orgs.push(org);
        this.#repo.update(user);
    }
    searchUserByEmail(email){
        if(!email) throw new Error("Enter the email for search the user")
        return this.#repo.findOneByEmail(email)
    }
}
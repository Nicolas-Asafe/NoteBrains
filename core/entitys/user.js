export default class User{
    #user
    constructor(name,password,email){
        this.#user = {
            name,password,email
        }
        return this.#user
    }

    info(){
        console.log(this.#user)
    }
}
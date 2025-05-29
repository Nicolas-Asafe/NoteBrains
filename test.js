import UserService from "./core/services/userService.js";
import MemoryRepository from "./adapters/repositorys/memoryRepo/memoryRepo.js";

const repo = new MemoryRepository()
const serv = new UserService(repo)


try{
    serv.newUser({
    name:"Nicolas",
    password:2323,
    email:"nick@gmail.com"
})
}catch(err){
    console.log(err.message)
}
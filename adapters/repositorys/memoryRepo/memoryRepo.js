import User from "../../../core/entitys/user.js";
import repositoryUser from "../../../core/interfaces/repositoryUsers.js";
import bcrypt from 'bcrypt'

const db = {
    users: [
        new User({
            name: "admin",
            password: await bcrypt.hash("1212Admin", 10),
            email: "admin@admin.com",
            id: 0
        })
    ]
}

export default class MemoryRepository extends repositoryUser {
    save(user) {
        if (user.id === undefined || user.id === null) user.id = db.users.length;
        const userName = db.users.find(u => user.name === u.name)
        const userEmail = db.users.find(u => user.email === u.email)

        if (userName) throw new Error("This name is used")
        if (userEmail) throw new Error("This email is used")

        db.users.push(user);
    }
    find() {
        return db.users
    }
    findOneByEmail(email) {
        const userObj = db.users.find(u => u.email === email);
        if (!userObj) throw new Error("User not exists");
        return userObj
    }
    remove(id) {
        const userIndex = db.users.findIndex(u => u.id === id);
        if (userIndex === -1) throw new Error("User not found");
        db.users.splice(userIndex, 1);
    }


    findOne(id) {
        const userObj = db.users.find(u => u.id === id);
        if (!userObj) throw new Error("User not exists");
        return userObj
    }

    update(user) {
        const index = db.users.findIndex(u => u.id === user.id);
        if (index === -1){ 
            throw new Error("User not found") 
        }
        db.users[index] = user;
        return db.users[index]
    }

}

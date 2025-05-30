import User from "../../../core/entitys/user.js";
import repositoryUser from "../../../core/interfaces/repositoryUsers.js";

const db = {
    users: []
}

export default class MemoryRepository extends repositoryUser {
    save(user) {
        if (user.id === undefined || user.id === null) user.id = db.users.length;
        db.users.push(user);
    }
    find() {
        return db.users
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
        if (index === -1) throw new Error("User not found");
        db.users[index] = user;
    }

}

import User from "../../../core/entitys/user.js";
import repositoryUser from "../../../core/interfaces/repositoryUsers.js";
import bcrypt from 'bcrypt';

const db = {
  users: [
    new User({
      name: "admin",
      password: await bcrypt.hash("1212Admin", 10),
      email: "admin@admin.com",
      id: 0
    })
  ]
};

export default class MemoryRepository extends repositoryUser {
  save(user) {
    if (user.id === undefined || user.id === null) user.id = db.users.length;

    const userEmail = db.users.find(u => u.email.toLowerCase() === user.email.toLowerCase());

    if (userName) throw new Error("This name is already in use");
    if (userEmail) throw new Error("This email is already in use");

    db.users.push(user);
  }

  find() {
    return db.users;
  }

  findOneByEmail(email) {
    if (!email) throw new Error("Email is required");
    const userObj = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!userObj) throw new Error("User does not exist");
    return userObj;
  }

  remove(id) {
    const userIndex = db.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error("User not found");
    db.users.splice(userIndex, 1);
  }

  findOne(id) {
    if (id === undefined || id === null) throw new Error("User id is required");
    const userObj = db.users.find(u => u.id === id);
    if (!userObj) throw new Error("User does not exist");
    return userObj;
  }

  update(user) {
    if (user.id === undefined || user.id === null) throw new Error("User id is required");
    const index = db.users.findIndex(u => u.id === user.id);
    if (index === -1) throw new Error("User not found");


    db.users[index] = user;
    return db.users[index];
  }
}

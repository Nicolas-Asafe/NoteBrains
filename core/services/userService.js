import User from "../entitys/user.js";

export default class UserService {
  #repo;
  constructor(repo) {
    this.#repo = repo;
  }

  newUser(data) {
    if (!data.name || !data.password || !data.email) {
      throw new Error("Credentials are missing: name, password, and email are required");
    }
    const newUser = new User(data);
    this.#repo.save(newUser);
  }

  deleteUser(id) {
    if (id === undefined || id === null) throw new Error("Enter the user id to delete");
    const user = this.#repo.findOne(id);
    if (!user) throw new Error("User not found");
    this.#repo.remove(id);
  }

  listUsers() {
    return this.#repo.find();
  }

  searchUserById(id) {
    if (id === undefined || id === null) throw new Error("Enter the user id to find");
    const user = this.#repo.findOne(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  edit(newUser) {
    if (newUser.id === undefined || newUser.id === null) throw new Error("Enter the user id to update");
    const existingUser = this.#repo.findOne(newUser.id);
    if (!existingUser) throw new Error("User not found");
    this.#repo.update(newUser);
  }

  addOrgById(userId, org) {
    const user = this.searchUserById(userId);
    if (!user.orgs) user.orgs = [];
    user.orgs.push(org);
    this.#repo.update(user);
  }

  searchUserByEmail(email) {
    if (!email) throw new Error("Enter the email to search for the user");
    const user = this.#repo.findOneByEmail(email);
    if (!user) throw new Error("User not found");
    return user;
  }
}

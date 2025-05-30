export default class User {
  #user;
  constructor({name, password, email, id}) {
    this.#user = {
      name,
      password,
      email,
      id,
      orgs: []
    };
    return this.#user
  }


  get info() {
    console.log(this.#user);
  }
}

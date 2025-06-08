export default class OrgService {
  #userRepo;

  constructor(userRepo) {
    this.#userRepo = userRepo;
  }

  getOrgById(userId, orgId) {
    const user = this.#userRepo.findOne(userId);
    if (!user) throw new Error("User not found"); // nunca deixar passar user undefined
    return user.orgs.find(org => org.id === orgId);
  }

  deleteOrgById(userId, orgId) {
    const user = this.#userRepo.findOne(userId);
    if (!user) throw new Error("User not found"); // mantém o padrão do erro, mais claro
    const orgExists = user.orgs.some(org => org.id === orgId);
    if (!orgExists) throw new Error("Org not exists");
    
    user.orgs = user.orgs.filter(org => org.id !== orgId);
    this.#userRepo.update(user);
  }

  async editOrgById(userId, orgId, newData) {
    const user = this.#userRepo.findOne(userId);
    if (!user) throw new Error("User not found");

    const index = user.orgs.findIndex(org => org.id === orgId);
    if (index === -1) throw new Error("Org not found");

    user.orgs[index] = {
      ...user.orgs[index],
      ...newData
    };

    const result = await this.#userRepo.update(user);
    return !!result;
  }
}

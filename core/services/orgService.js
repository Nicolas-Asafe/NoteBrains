export default class OrgService {
    #userRepo

    constructor(userRepo) {
        this.#userRepo = userRepo;
    }

    getOrgById(userId, orgId) {
        const user = this.#userRepo.findOne(userId);
        return user.orgs.find(org => org.id === orgId);
    }

    deleteOrgById(userId, orgId) {
        const user = this.#userRepo.findOne(userId);
        if(!user) throw new Error("Org not exists")
        user.orgs = user.orgs.filter(org => org.id !== orgId);
        this.#userRepo.update(user);
    }

    editOrgById(userId, orgId, newData) {
        const user = this.#userRepo.findOne(userId);
        const index = user.orgs.findIndex(org => org.id === orgId);
        if (index === -1) throw new Error("Org not found");

        user.orgs[index] = {
            ...user.orgs[index],
            ...newData
        };
        this.#userRepo.update(user);
    }
}

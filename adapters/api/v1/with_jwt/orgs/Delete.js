import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";

export const register = tomato.NewRegister({
  caseError: (err, req, res) => {
    tomato.buildResponse(res, { message: "erro for delete org",data:err.message, status: 500 });
  },
  method: "DELETE",
  path: "/delete/:id",
  process: (req, res) => {
    const orgId = req.params.id

    if (isNaN(orgId)) {
      throw new Error("Missing or invalid org ID.");
    }
    const user = serv.searchUserByEmail(req.user.email)
    if (user.id === null || user.id === undefined) {
      throw new Error("Unauthorized: user ID not found.");
    }
    const orgExists = servOrgs.getOrgById(user.id, parseInt(orgId))
    if(!orgExists) throw new Error("Org not exists")
    servOrgs.deleteOrgById(user.id, parseInt(orgId));

    tomato.buildResponse(res, {
      message: "Org deleted successfully",
      status: 200,
    });
  },
});

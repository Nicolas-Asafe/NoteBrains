import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";

export const register = tomato.NewRegister({
  method: "PUT",
  path: "/edit/:id",
  caseError: (err, req, res) => {
    tomato.buildResponse(res, { message: "erro for update org",data:err.message, status: 500 });
  },
  process: async (req, res) => {
    const orgId = parseInt(req.params.id);
    const updates = req.body;
    const user = await serv.searchUserByEmail(req.user.email)
    const userId = user.id;
  
    const org = await servOrgs.getOrgById(userId,orgId);
    if (!org) throw new Error("Org not found or access denied.");

    const success = await servOrgs.editOrgById(userId,orgId, updates);
    if (!success) throw new Error("Failed to update org.");

    tomato.buildResponse(res, {
      message: "Org updated successfully.",
      status: 200,
    });
  }
});

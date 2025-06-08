import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";

export const register = tomato.NewRegister({
  method: "PUT",
  path: "/edit/:id",
  caseError: (err, req, res) => {
    tomato.buildResponse(res, {
      message: "Erro ao atualizar organização",
      data: err.message,
      status: 500,
    });
  },
  process: async (req, res) => {
    const orgId = parseInt(req.params.id);
    const updates = req.body;
    const user = await serv.searchUserByEmail(req.user.email);
    const userId = user.id;

    const org = await servOrgs.getOrgById(userId, orgId);
    if (!org) throw new Error("Organização não encontrada ou acesso negado.");

    const success = await servOrgs.editOrgById(userId, orgId, updates);
    if (!success) throw new Error("Falha ao atualizar a organização.");

    tomato.buildResponse(res, {
      message: "Organização atualizada com sucesso.",
      status: 200,
    });
  }
});

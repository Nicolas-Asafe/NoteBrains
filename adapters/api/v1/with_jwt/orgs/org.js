import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";

export const register = tomato.NewRegister({
  caseError: (err, req, res) => {
    tomato.buildResponse(res, {
      message: "Erro ao listar organização",
      data: err.message,
      status: 500
    });
  },
  path: "/:id",
  method: "GET",
  process: (req, res) => {
    const orgId = parseInt(req.params.id);
    const user = serv.searchUserByEmail(req.user.email);

    if (!user || user.id === undefined || user.id === null) {
      throw new Error("Usuário não encontrado ou não autorizado.");
    }

    const org = servOrgs.getOrgById(user.id, orgId);
    if (!org) throw new Error("Organização não encontrada.");

    tomato.buildResponse(res, {
      message: "Organização listada com sucesso",
      data: org,
      status: 200
    });
  }
});

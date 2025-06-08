import tomato from "tomato-x";
import serv, { servOrgs } from "../../../app.js";

export const register = tomato.NewRegister({
  caseError: (err, req, res) => {
    tomato.buildResponse(res, {
      message: "Erro ao deletar organização",
      data: err.message,
      status: 500
    });
  },
  method: "DELETE",
  path: "/delete/:id",
  process: (req, res) => {
    const orgId = req.params.id;

    if (isNaN(orgId)) {
      throw new Error("ID da organização ausente ou inválido.");
    }

    const user = serv.searchUserByEmail(req.user.email);

    if (user.id === null || user.id === undefined) {
      throw new Error("Não autorizado: ID do usuário não encontrado.");
    }

    const orgExists = servOrgs.getOrgById(user.id, parseInt(orgId));
    if (!orgExists) throw new Error("Organização não encontrada.");

    servOrgs.deleteOrgById(user.id, parseInt(orgId));

    tomato.buildResponse(res, {
      message: "Organização deletada com sucesso",
      status: 200
    });
  },
});

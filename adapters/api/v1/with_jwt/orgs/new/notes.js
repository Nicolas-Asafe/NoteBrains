import tomato from "tomato-x";
import { serv } from "../../../../app.js";
import OrgNote from "../../../../../../core/entitys/orgs/OrgNote.js";

export const register = tomato.NewRegister({
    method: "POST",
    path: "/notes",
    caseError: (err, req, res) => {
        tomato.buildResponse(res, {
            message: "Erro ao criar a nota",
            data: err.message,
            status: 500
        });
    },
    process: async (req, res) => {
        const body = req.body;

        if (!body || !body.title || !body.notes) {
            throw new Error("Campos obrigatórios ausentes: título e conteúdo da nota são obrigatórios.");
        }

        const user = serv.searchUserByEmail(req.user.email);
        const newNote = new OrgNote(
            body.title,
            new Date(),
            body.notes,
            user.orgs.length
        );

        serv.addOrgById(user.id, newNote);

        tomato.buildResponse(res, {
            message: "Nota criada com sucesso",
            status: 201
        });
    }
});

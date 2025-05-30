// Importa o serviço que lida com usuários
import UserService from "./core/services/userService.js";

// Importa o repositório em memória onde os dados vão ser armazenados
import MemoryRepository from "./adapters/repositorys/memoryRepo/memoryRepo.js";

// Importa a entidade OrgNote (a nota que será adicionada ao user)
import OrgNote from "./core/entitys/orgs/OrgNote.js";

// Cria o repositório onde os dados dos usuários vão ficar salvos
const repo = new MemoryRepository();

// Cria o serviço de usuário, passando o repositório
const serv = new UserService(repo);

function main() {
    try {
        // =============== CRIAÇÃO DO USUÁRIO ===============
        serv.newUser({
            name: "Nicolas",            // nome do user
            password: "1234",           // senha do user
            email: "brasil@gmail.com"   // email do user
        });

        // =============== CRIAÇÃO DA NOTA ===============
        const nota = new OrgNote(
            "Minha nota",               // título da nota
            new Date(),                 // data atual
            "Minha descrição"           // conteúdo da nota
        );

        // =============== ADICIONA A NOTA AO USUÁRIO COM ID 0 ===============
        serv.addOrgById(0, nota);        // adiciona a nota no user com ID 0

        // =============== MOSTRA USUÁRIOS COM SUAS NOTAS ===============
        console.table(serv.listUsers().map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            orgs: user.orgs.map(org => org.title) // mostra só o título das notas
        })));

    } catch (err) {
        console.error(err.message);
    }
}

main();


// test.js

import UserService from "./core/services/userService.js";
import MemoryRepository from "./adapters/repositorys/memoryRepo/memoryRepo.js";
import OrgNote from "./core/entitys/orgs/OrgNote.js";

// Cria o repositório em memória (pode ser trocado futuramente por MongoDB)
const repo = new MemoryRepository();

// Cria o serviço de usuário passando o repositório
const userService = new UserService(repo);

function main() {
  try {
    // 1. Criação de novo usuário
    userService.newUser({
      name: "Nicolas",
      password: "1234",
      email: "brasil@gmail.com",
    });
    console.log("Usuário criado!");

    // 2. Criação de uma nova nota (OrgNote)
    const nota = new OrgNote("Minha nota", new Date(), "Descrição top");
    console.log("Nota criada!");

    // 3. Adiciona a nota ao usuário com ID 0
    userService.addOrgById(0, nota);
    console.log("Nota adicionada ao usuário!");

    // 4. Lista todos os usuários e exibe infos
    const users = userService.listUsers();
    console.log("Lista de usuários:");
    console.table(users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      orgs: u.orgs.length
    })));

    // 5. Busca usuário por ID
    const userFound = userService.searchUserById(0);
    console.log("Usuário encontrado pelo ID:");
    console.log(userFound);

    // 6. Edita usuário (simula uma mudança de nome)
    userFound.name = "Nicolas Alterado";
    userService.edit(userFound);
    console.log("Usuário editado com sucesso!");

    // 7. Mostra usuário editado
    const updated = userService.searchUserById(0);
    console.log("Usuário atualizado:");
    console.log(updated);

    // 8. Deleta usuário
    userService.deleteUser(0);
    console.log("Usuário deletado!");

    // 9. Lista final de usuários (deve estar vazia)
    console.log("Lista após exclusão:");
    console.table(userService.listUsers());

  } catch (err) {
    console.error("ERRO:", err.message);
  }
}

main();

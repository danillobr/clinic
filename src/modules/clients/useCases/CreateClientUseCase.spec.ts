import { AppError } from "../../../shared/errors/AppError";
import { IClientsRepository } from "../repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "../repositories/in-memory/ClientsRepositoryInMemory";
import { CreateClientUseCase } from "./CreateClientUseCase";

let clientsRepositoryInMemory: IClientsRepository;
let createClientUseCase: CreateClientUseCase;

describe("Create client", () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientsRepositoryInMemory);
  });

  it("should be able to create a new client", async () => {
    const client = {
      name: "Test name",
      email: "email@test.com",
      cpf: "111.222.333-04",
      fone: "(82) 99999-9999",
      password: "test54321",
    };

    const clientCreated = await createClientUseCase.execute({
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      fone: client.fone,
      password: client.password,
    });

    expect(clientCreated).toHaveProperty("id");
  });

  it("should not be able to create a new client with a name or cpf already registered", async () => {
    const client1 = {
      name: "Test name",
      email: "email@test.com",
      cpf: "111.222.333-04",
      fone: "(82) 99999-9999",
      password: "test54321",
    };

    const client2 = {
      name: "Test name 2",
      email: "email@test.com",
      cpf: "111.222.333-04",
      fone: "(82) 88888-8888",
      password: "test54321",
    };

    await createClientUseCase.execute({
      name: client1.name,
      cpf: client1.cpf,
      email: client1.email,
      fone: client1.fone,
      password: client1.password,
    });

    await expect(
      createClientUseCase.execute({
        name: client2.name,
        cpf: client2.cpf,
        email: client2.email,
        fone: client2.fone,
        password: client2.password,
      })
    ).rejects.toEqual(new AppError("Client already exists!"));
  });
});

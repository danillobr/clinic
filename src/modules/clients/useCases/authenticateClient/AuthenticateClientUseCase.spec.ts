import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ClientsRepositoryInMemory } from "@modules/clients/repositories/in-memory/ClientsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateClientUseCase } from "../createClient/CreateClientUseCase";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

let clientRepositoryInMemory: IClientsRepository;
let authenticateClientUseCase: AuthenticateClientUseCase;
let createClientUseCase: CreateClientUseCase;

describe("", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientsRepositoryInMemory();
    authenticateClientUseCase = new AuthenticateClientUseCase(
      clientRepositoryInMemory
    );
    createClientUseCase = new CreateClientUseCase(clientRepositoryInMemory);
  });

  it("should be able to authenticate an client", async () => {
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

    const token = await authenticateClientUseCase.execute({
      email: client.email,
      password: client.password,
    });

    expect(token).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent client", () => {
    expect(async () => {
      await authenticateClientUseCase.execute({
        email: "false@email",
        password: "123",
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
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

    expect(async () => {
      await authenticateClientUseCase.execute({
        email: client.email,
        password: "incorrect password",
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});

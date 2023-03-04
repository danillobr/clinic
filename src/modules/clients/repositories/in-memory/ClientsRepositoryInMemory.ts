import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { Client } from "../../infra/typeorm/entities/Client";
import { IClientsRepository } from "../IClientsRepository";

class ClientsRepositoryInMemory implements IClientsRepository {
  clients: Client[] = [];

  async create({
    name,
    email,
    password,
    fone,
    cpf,
  }: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, {
      name,
      email,
      password,
      fone,
      cpf,
    });

    this.clients.push(client);

    return client;
  }

  async findByCPFAndEmail(cpf: string, email: string): Promise<Client> {
    return this.clients.find(
      (client) => client.cpf === cpf || client.email === email
    );
  }
}

export { ClientsRepositoryInMemory };

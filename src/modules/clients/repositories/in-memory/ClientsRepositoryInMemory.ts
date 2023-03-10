import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { Client } from "@modules/clients/infra/typeorm/entities/Client";

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

  async findByEmail(email: string): Promise<Client> {
    return this.clients.find((client) => client.email === email);
  }

  async findById(id: string): Promise<Client> {
    return this.clients.find((client) => client.id === id);
  }
}

export { ClientsRepositoryInMemory };

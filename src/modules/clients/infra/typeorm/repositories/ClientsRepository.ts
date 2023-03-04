import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { Repository, getRepository } from "typeorm";
import { Client } from "../entities/Client";
import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  async create({
    name,
    email,
    password,
    fone,
    cpf,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.repository.create({
      name,
      email,
      password,
      fone,
      cpf,
    });

    await this.repository.save(client);

    return client;
  }

  async findByCPFAndEmail(cpf: string, email: string): Promise<Client> {
    return await this.repository.findOne({
      where: [{ cpf }, { email }],
    });
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<Client> {
    return await this.repository.findOne(id);
  }
}

export { ClientsRepository };

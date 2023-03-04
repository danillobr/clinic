import { IClientsRepository } from "../../../../repositories/IClientsRepository";
import { Repository, getRepository } from "typeorm";
import { Client } from "../Client";
import { ICreateClientDTO } from "../../../../dtos/ICreateClientDTO";

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
    return this.repository.findOne({
      where: [{ cpf }, { email }],
    });
  }
}

export { ClientsRepository };

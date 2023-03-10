import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { Client } from "../infra/typeorm/entities/Client";

interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findByCPFAndEmail(cpf: string, email: string): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
  findById(id: string): Promise<Client>;
}

export { IClientsRepository };

import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { Client } from "@modules/clients/infra/typeorm/entities/Attendant";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";

@injectable()
class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({
    name,
    email,
    cpf,
    fone,
    password,
  }: ICreateClientDTO): Promise<Client> {
    const clientAlreadyExists = await this.clientsRepository.findByCPFAndEmail(
      cpf,
      email
    );

    if (clientAlreadyExists) {
      throw new AppError("Client already exists!");
    }

    const passwordHash = await hash(password, 8);

    const client = await this.clientsRepository.create({
      name,
      email,
      cpf,
      fone,
      password: passwordHash,
    });

    return client;
  }
}

export { CreateClientUseCase };

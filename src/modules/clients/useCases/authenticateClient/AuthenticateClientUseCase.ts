import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IResponse {
  client: {
    name: string;
    email: string;
  };
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Cliente existe?
    const client = await this.clientsRepository.findByEmail(email);

    if (!client) {
      throw new AppError("Email or password incorrect!");
    }

    //Senha está correta?
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    //Gerar jsonwebtoken
    const token = sign({}, "14c208b3c86ff07280ca891ddc370608", {
      subject: client.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      client: {
        name: client.name,
        email: client.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthenticateClientUseCase };

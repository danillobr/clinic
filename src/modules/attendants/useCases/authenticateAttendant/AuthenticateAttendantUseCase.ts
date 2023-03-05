import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { IAttendantsRepository } from "@modules/attendants/repositories/IAttendantsRepository";

interface IResponse {
  attendant: {
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
class AuthenticateAttendantUseCase {
  constructor(
    @inject("AttendantsRepository")
    private attendantsRepository: IAttendantsRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Attendant existe?
    const attendant = await this.attendantsRepository.findByEmail(email);

    if (!attendant) {
      throw new AppError("Email or password incorrect!");
    }

    //Senha está correta?
    const passwordMatch = await compare(password, attendant.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    //Gerar jsonwebtoken
    const token = sign({}, auth.secret_token, {
      subject: attendant.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      attendant: {
        name: attendant.name,
        email: attendant.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthenticateAttendantUseCase };

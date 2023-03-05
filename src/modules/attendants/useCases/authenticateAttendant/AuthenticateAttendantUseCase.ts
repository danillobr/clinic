import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { IAttendantRepository } from "@modules/attendants/repositories/IAttendantRepository";

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
    @inject("AttendantRepository")
    private attendantRepository: IAttendantRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //Attendant existe?
    const attendant = await this.attendantRepository.findByEmail(email);

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

import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";

import { Attendant } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { ICreateAttendantDTO } from "@modules/attendants/dtos/ICreateAttendantDTO";
import { IAttendantsRepository } from "@modules/attendants/repositories/IAttendantsRepository";

@injectable()
class CreateAttendantUseCase {
  constructor(
    @inject("AttendantsRepository")
    private attendantsRepository: IAttendantsRepository
  ) {}

  async execute({
    name,
    email,
    password,
    role,
  }: ICreateAttendantDTO): Promise<Attendant> {
    const attendantAlreadyExists = await this.attendantsRepository.findByEmail(
      email
    );

    if (attendantAlreadyExists) {
      throw new AppError("Attendant already exists!");
    }

    const passwordHash = await hash(password, 8);

    const attendant = await this.attendantsRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    return attendant;
  }
}

export { CreateAttendantUseCase };

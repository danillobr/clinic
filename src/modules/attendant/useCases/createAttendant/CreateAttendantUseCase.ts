import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";

import { IAttendantRepository } from "@modules/attendant/repositories/IAttendantRepository";
import { ICreateAttendantDTO } from "@modules/attendant/dtos/ICreateAttendantDTO";
import { Attendant } from "@modules/attendant/infra/typeorm/entities/Attendant";

@injectable()
class CreateAttendantUseCase {
  constructor(
    @inject("AttendantRepository")
    private attendantRepository: IAttendantRepository
  ) {}

  async execute({
    name,
    email,
    password,
    role,
  }: ICreateAttendantDTO): Promise<Attendant> {
    const attendantAlreadyExists = await this.attendantRepository.findByEmail(
      email
    );

    if (attendantAlreadyExists) {
      throw new AppError("Attendant already exists!");
    }

    const passwordHash = await hash(password, 8);

    const attendant = await this.attendantRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    return attendant;
  }
}

export { CreateAttendantUseCase };

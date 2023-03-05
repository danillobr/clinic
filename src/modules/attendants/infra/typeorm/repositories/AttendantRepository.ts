import { ICreateAttendantDTO } from "@modules/attendant/dtos/ICreateAttendantDTO";
import { IAttendantRepository } from "@modules/attendant/repositories/IAttendantRepository";
import { Repository, getRepository } from "typeorm";

import { Attendant } from "../entities/Attendant";

class AttendantRepository implements IAttendantRepository {
  private repository: Repository<Attendant>;

  constructor() {
    this.repository = getRepository(Attendant);
  }

  async create({
    name,
    email,
    password,
    role,
  }: ICreateAttendantDTO): Promise<Attendant> {
    const attendant = this.repository.create({
      name,
      email,
      password,
      role,
    });

    await this.repository.save(attendant);

    return attendant;
  }

  async findByEmail(email: string): Promise<Attendant> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<Attendant> {
    return await this.repository.findOne(id);
  }
}

export { AttendantRepository };

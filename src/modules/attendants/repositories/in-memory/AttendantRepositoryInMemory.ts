import { ICreateAttendantDTO } from "@modules/attendants/dtos/ICreateAttendantDTO";
import { Attendant } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { IAttendantRepository } from "../IAttendantRepository";

class AttendantRepositoryInMemory implements IAttendantRepository {
  attendants: Attendant[] = [];

  async create({
    name,
    email,
    password,
    role,
  }: ICreateAttendantDTO): Promise<Attendant> {
    const attendant = new Attendant();

    Object.assign(attendant, {
      name,
      email,
      password,
      role,
    });

    this.attendants.push(attendant);

    return attendant;
  }

  async findByEmail(email: string): Promise<Attendant> {
    return this.attendants.find((attendant) => attendant.email === email);
  }

  async findById(id: string): Promise<Attendant> {
    return this.attendants.find((attendant) => attendant.id === id);
  }
}

export { AttendantRepositoryInMemory };

import { ICreateAttendantDTO } from "../dtos/ICreateAttendantDTO";
import { Attendant } from "../infra/typeorm/entities/Attendant";

interface IAttendantsRepository {
  create(data: ICreateAttendantDTO): Promise<Attendant>;
  findByEmail(email: string): Promise<Attendant>;
  findById(id: string): Promise<Attendant>;
  list(): Promise<Attendant[]>;
}

export { IAttendantsRepository };

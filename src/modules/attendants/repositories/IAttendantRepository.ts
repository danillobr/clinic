import { ICreateAttendantDTO } from "../dtos/ICreateAttendantDTO";
import { Attendant } from "../infra/typeorm/entities/Attendant";

interface IAttendantRepository {
  create(data: ICreateAttendantDTO): Promise<Attendant>;
  findByEmail(email: string): Promise<Attendant>;
  findById(id: string): Promise<Attendant>;
}

export { IAttendantRepository };

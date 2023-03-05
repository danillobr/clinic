import { UserRole } from "../infra/typeorm/entities/Attendant";

interface ICreateAttendantDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export { ICreateAttendantDTO };

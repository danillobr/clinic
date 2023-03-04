import { ICreateProfessionalDTO } from "../dtos/ICreateProfessionalDTO";
import { Professional } from "../infra/typeorm/entities/Professional";

interface IProfessionalsRepository {
  create(data: ICreateProfessionalDTO): Promise<Professional>;
  findByFone(fone: string): Promise<Professional>;
}

export { IProfessionalsRepository };

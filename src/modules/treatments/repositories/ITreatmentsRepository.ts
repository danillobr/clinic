import { ICreateTreatmentDTO } from "../dtos/ICreateTreatmentDTO";
import { Treatment } from "../infra/typeorm/entities/Treatment";

interface ITreatmentsRepository {
  create(data: ICreateTreatmentDTO): Promise<Treatment>;
}

export { ITreatmentsRepository };

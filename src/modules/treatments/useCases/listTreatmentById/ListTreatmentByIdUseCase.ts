import { inject, injectable } from "tsyringe";
import { Service } from "@modules/services/infra/typeorm/entities/Service";
import { ITreatmentsRepository } from "@modules/treatments/repositories/ITreatmentsRepository";
import { AppError } from "@shared/errors/AppError";
import { Treatment } from "@modules/treatments/infra/typeorm/entities/Treatment";

@injectable()
class ListTreatmentByIdUseCase {
  constructor(
    @inject("TreatmentsRepository")
    private treatmentsRepository: ITreatmentsRepository
  ) {}

  async execute({ id }): Promise<Treatment[]> {
    const listTreatment = await this.treatmentsRepository.listByClient(id);

    if (!listTreatment) {
      throw new AppError("Treatment not exists!");
    }

    return listTreatment;
  }
}

export { ListTreatmentByIdUseCase };

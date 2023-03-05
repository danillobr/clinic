import { inject, injectable } from "tsyringe";
import { Service } from "@modules/services/infra/typeorm/entities/Service";
import { ITreatmentsRepository } from "@modules/treatments/repositories/ITreatmentsRepository";
import { AppError } from "@shared/errors/AppError";
import { Treatment } from "@modules/treatments/infra/typeorm/entities/Treatment";

@injectable()
class ListTreatmentUseCase {
  constructor(
    @inject("TreatmentsRepository")
    private treatmentsRepository: ITreatmentsRepository
  ) {}

  async execute(): Promise<Treatment[]> {
    const treatmentsExists = await this.treatmentsRepository.list();

    return treatmentsExists;
  }
}

export { ListTreatmentUseCase };

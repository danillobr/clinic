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

  private calculeDate(begin_time: Date, end_time: Date): number {
    return (
      (new Date(end_time).getTime() - new Date(begin_time).getTime()) /
      1000 /
      60
    );
  }

  async execute(): Promise<Treatment[]> {
    const treatmentsExists = await this.treatmentsRepository.list();

    const listTreatmentWithTime = treatmentsExists.map((treatment) => {
      return {
        ...treatment,
        applied_time:
          treatment.begin_time && treatment.end_time
            ? this.calculeDate(treatment.begin_time, treatment.end_time)
            : null,
      };
    });

    return listTreatmentWithTime;
  }
}

export { ListTreatmentUseCase };

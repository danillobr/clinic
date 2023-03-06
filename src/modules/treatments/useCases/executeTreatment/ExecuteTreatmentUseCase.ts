import { inject, injectable } from "tsyringe";

import { ITreatmentsRepository } from "@modules/treatments/repositories/ITreatmentsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
class ExecuteTreatmentUseCase {
  constructor(
    @inject("TreatmentsRepository")
    private treatmentsRepository: ITreatmentsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<boolean> {
    try {
      return await this.treatmentsRepository.updateTime(id);
    } catch {
      throw new AppError('Invalid ID');
    } 
  }
}

export { ExecuteTreatmentUseCase };

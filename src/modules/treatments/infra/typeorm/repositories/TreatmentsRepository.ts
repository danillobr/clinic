import { getRepository, Repository } from "typeorm";

import { ICreateTreatmentDTO } from "@modules/treatments/dtos/ICreateTreatmentDTO";
import { Treatment } from "../entities/Treatment";
import { ITreatmentsRepository } from "@modules/treatments/repositories/ITreatmentsRepository";

class TreatmentsRepository implements ITreatmentsRepository {
  private repository: Repository<Treatment>;

  constructor() {
    this.repository = getRepository(Treatment);
  }

  async create({
    total_amount,
    total_commission,
    client,
    attendant,
    professional,
    services,
  }: ICreateTreatmentDTO): Promise<Treatment> {
    const treatment = this.repository.create({
      total_amount,
      total_commission,
      client,
      attendant,
      professional,
      services,
    });

    await this.repository.save(treatment);

    return treatment;
  }
}

export { TreatmentsRepository };

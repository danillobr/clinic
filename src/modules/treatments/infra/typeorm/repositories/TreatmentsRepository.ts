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
    total_time_services,
    begin_time,
    end_time,
    client,
    professional,
    services,
  }: ICreateTreatmentDTO): Promise<Treatment> {
    const treatment = this.repository.create({
      total_amount,
      total_commission,
      total_time_services,
      begin_time,
      end_time,
      client,
      professional,
      services,
    });

    await this.repository.save(treatment);

    return treatment;
  }

  async listByClient(id: string): Promise<Treatment[]> {
    return await this.repository.find({ client: { id } });
  }

  async list(): Promise<Treatment[]> {
    return await this.repository.find();
  }

  async updateTime(id: string): Promise<boolean> {
    if ((await this.repository.find({ id, begin_time: null }))?.length > 0) {
      await this.repository.update({ id }, { begin_time: new Date() });

      return true;
    }

    if ((await this.repository.find({ id, end_time: null }))?.length > 0) {
      await this.repository.update({ id }, { end_time: new Date() });

      return true;
    }

    return false;
  }
}

export { TreatmentsRepository };

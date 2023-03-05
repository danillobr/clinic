import { inject, injectable } from "tsyringe";

import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";

@injectable()
class ListProfessionalsUseCase {
  constructor(
    @inject("ProfessionalsRepository")
    private professionalsRepository: IProfessionalsRepository
  ) {}

  async execute(): Promise<Professional[]> {
    const rofessionals = await this.professionalsRepository.list();
    return rofessionals;
  }
}

export { ListProfessionalsUseCase };

import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { IProfessionalsRepository } from "@modules/professional/repositories/IProfessionalsRepository";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { ICreateProfessionalDTO } from "@modules/professional/dtos/ICreateProfessionalDTO";

@injectable()
class CreateProfessionalUseCase {
  constructor(
    @inject("ProfessionalsRepository")
    private professionalsRepository: IProfessionalsRepository
  ) {}

  async execute({ name, fone }: ICreateProfessionalDTO): Promise<Professional> {
    const professionaltAlreadyExists =
      await this.professionalsRepository.findByFone(fone);

    if (professionaltAlreadyExists) {
      throw new AppError("Professional already exists!");
    }

    const professionalt = await this.professionalsRepository.create({
      name,
      fone,
    });

    return professionalt;
  }
}

export { CreateProfessionalUseCase };

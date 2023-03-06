import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProfessionalsUseCase } from "./ListProfessionalsUseCase";

class ListProfessionalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProfessionalsUseCase = container.resolve(
      ListProfessionalsUseCase
    );

    const listProfessionals = await listProfessionalsUseCase.execute();

    return response.json(listProfessionals);
  }
}

export { ListProfessionalsController };

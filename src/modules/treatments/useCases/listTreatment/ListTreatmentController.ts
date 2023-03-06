import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTreatmentUseCase } from "./ListTreatmentUseCase";

class ListTreatmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTreatmentUseCase = container.resolve(ListTreatmentUseCase);

    const listTreatments = await listTreatmentUseCase.execute();

    return response.json(listTreatments);
  }
}

export { ListTreatmentController };

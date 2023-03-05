import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTreatmentByIdUseCase } from "./ListTreatmentByIdUseCase";

class ListTreatmentByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTreatmentUseCase = container.resolve(ListTreatmentByIdUseCase);

    const { client_id } = request.body;

    const treatment = await listTreatmentUseCase.execute({ id: client_id });

    return response.json(treatment);
  }
}

export { ListTreatmentByIdController };

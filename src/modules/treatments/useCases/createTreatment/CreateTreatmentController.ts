import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTreatmentUseCase } from "./CreateTreatmentUseCase";

class CreateTreatmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { client, professional, services } = request.body;

    const createTreatmentUseCase = container.resolve(CreateTreatmentUseCase);

    const treatment = await createTreatmentUseCase.execute({
      client,
      professional,
      services,
    });

    return response.status(201).json(treatment);
  }
}

export { CreateTreatmentController };

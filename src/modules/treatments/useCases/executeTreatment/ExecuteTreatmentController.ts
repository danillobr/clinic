import { Request, Response } from "express";
import { container } from "tsyringe";
import { ExecuteTreatmentUseCase } from "./ExecuteTreatmentUseCase";

class ExecuteTreatmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { treadment_id } = request.body;

    const executeTreatmentUseCase = container.resolve(ExecuteTreatmentUseCase);

    const treatment = await executeTreatmentUseCase.execute({
      id: treadment_id,
    });

    return response.status(201).json({ updated: treatment });
  }
}

export { ExecuteTreatmentController };

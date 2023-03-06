import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProfessionalUseCase } from "./CreateProfessionalUseCase";

class CreateProfessionalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, fone } = request.body;

    const createProfessionalUseCase = container.resolve(
      CreateProfessionalUseCase
    );

    const professional = await createProfessionalUseCase.execute({
      name,
      fone,
    });

    return response.status(201).json(professional);
  }
}

export { CreateProfessionalController };

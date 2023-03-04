import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, fone, cpf } = request.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    const client = await createClientUseCase.execute({
      name,
      email,
      password,
      fone,
      cpf,
    });

    return response.status(201).json(client);
  }
}

export { CreateClientController };

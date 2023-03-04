import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

class AuthenticateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateClientUseCase = container.resolve(
      AuthenticateClientUseCase
    );

    const token = await authenticateClientUseCase.execute({
      password,
      email,
    });

    return response.json(token);
  }
}

export { AuthenticateClientController };

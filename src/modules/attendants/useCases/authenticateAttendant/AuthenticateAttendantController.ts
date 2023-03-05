import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateAttendantUseCase } from "./AuthenticateAttendantUseCase";

class AuthenticateAttendantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateAttendantUseCase = container.resolve(
      AuthenticateAttendantUseCase
    );

    const token = await authenticateAttendantUseCase.execute({
      password,
      email,
    });

    return response.json(token);
  }
}

export { AuthenticateAttendantController };

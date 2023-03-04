import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAttendantUseCase } from "./CreateAttendantUseCase";

class CreateAttendantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role } = request.body;

    const createAttendantUseCase = container.resolve(CreateAttendantUseCase);

    const attendant = await createAttendantUseCase.execute({
      name,
      email,
      password,
      role,
    });

    return response.status(201).json(attendant);
  }
}

export { CreateAttendantController };

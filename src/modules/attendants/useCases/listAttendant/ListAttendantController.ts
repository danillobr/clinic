import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAttendantUseCase } from "./ListAttendantUseCase";

class ListAttendantsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAttendantsUseCase = container.resolve(ListAttendantUseCase);

    const listAttendants = await listAttendantsUseCase.execute();

    return response.json(listAttendants);
  }
}

export { ListAttendantsController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServicesUseCase } from "./ListServicesUseCase";

class ListServicesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listServicesUseCase = container.resolve(ListServicesUseCase);

    const listServices = await listServicesUseCase.execute();

    return response.json(listServices);
  }
}

export { ListServicesController };

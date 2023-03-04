import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import { AttendantRepository } from "@modules/attendant/infra/typeorm/repositories/AttendantRepository";
import { UserRole } from "@modules/attendant/infra/typeorm/entities/Attendant";

export async function ensureAttendantAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.body;

  const attendantRepository = new AttendantRepository();

  const attendant = await attendantRepository.findById(id);

  if (attendant.role !== UserRole.ADMIN) {
    throw new AppError("Attendant isn't admin!");
  }

  return next();
}

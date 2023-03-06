import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import { UserRole } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { AttendantsRepository } from "@modules/attendants/infra/typeorm/repositories/AttendantsRepository";

export async function ensureAttendantAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.body;

  const attendantsRepository = new AttendantsRepository();

  const attendant = await attendantsRepository.findById(id);

  if (attendant.role !== UserRole.ADMIN) {
    throw new AppError("Attendant isn't admin!");
  }

  return next();
}

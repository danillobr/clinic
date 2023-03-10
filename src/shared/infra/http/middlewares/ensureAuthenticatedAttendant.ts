import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { AttendantsRepository } from "@modules/attendants/infra/typeorm/repositories/AttendantsRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticatedAttendant(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: attendant_id } = verify(token, auth.secret_token) as IPayload;

    const attendantsRepository = new AttendantsRepository();

    const user = attendantsRepository.findById(attendant_id);

    if (!user) {
      throw new AppError("Attendant does not exists!", 401);
    }

    request.body.id = attendant_id;

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

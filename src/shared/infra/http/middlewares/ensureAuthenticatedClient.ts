import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { ClientsRepository } from "@modules/clients/infra/typeorm/repositories/ClientsRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticatedClient(
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
    const { sub: client_id } = verify(token, auth.secret_token) as IPayload;

    const clientRepository = new ClientsRepository();

    const user = clientRepository.findById(client_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}

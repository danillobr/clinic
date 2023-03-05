import { UserRole } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { IAttendantRepository } from "@modules/attendants/repositories/IAttendantRepository";
import { AttendantRepositoryInMemory } from "@modules/attendants/repositories/in-memory/AttendantRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateAttendantUseCase } from "../createAttendant/CreateAttendantUseCase";
import { AuthenticateAttendantUseCase } from "./AuthenticateAttendantUseCase";

let attendantRepositoryInMemory: IAttendantRepository;
let authenticateAttendantUseCase: AuthenticateAttendantUseCase;
let createAttendantUseCase: CreateAttendantUseCase;

describe("", () => {
  beforeEach(() => {
    attendantRepositoryInMemory = new AttendantRepositoryInMemory();
    authenticateAttendantUseCase = new AuthenticateAttendantUseCase(
      attendantRepositoryInMemory
    );
    createAttendantUseCase = new CreateAttendantUseCase(
      attendantRepositoryInMemory
    );
  });

  it("should be able to authenticate an attendant", async () => {
    const attendant = {
      name: "Test name",
      email: "email@test.com",
      password: "test54321",
      role: UserRole.ADMIN,
    };

    const attendantCreated = await createAttendantUseCase.execute({
      name: attendant.name,
      email: attendant.email,
      password: attendant.password,
      role: attendant.role,
    });

    const token = await authenticateAttendantUseCase.execute({
      email: attendant.email,
      password: attendant.password,
    });

    expect(token).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent attendant", () => {
    expect(async () => {
      await authenticateAttendantUseCase.execute({
        email: "false@email",
        password: "123",
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const attendant = {
      name: "Test name",
      email: "email@test.com",
      password: "test54321",
      role: UserRole.ADMIN,
    };

    const attendantCreated = await createAttendantUseCase.execute({
      name: attendant.name,
      email: attendant.email,
      password: attendant.password,
      role: attendant.role,
    });

    expect(async () => {
      await authenticateAttendantUseCase.execute({
        email: attendantCreated.email,
        password: "incorrect password",
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});

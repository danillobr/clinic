import { UserRole } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { IAttendantsRepository } from "@modules/attendants/repositories/IAttendantsRepository";
import { AttendantsRepositoryInMemory } from "@modules/attendants/repositories/in-memory/AttendantsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { CreateAttendantUseCase } from "./CreateAttendantUseCase";

let attendantRepositoryInMemory: IAttendantsRepository;
let attendantClientUseCase: CreateAttendantUseCase;

describe("Create attendant", () => {
  beforeEach(() => {
    attendantRepositoryInMemory = new AttendantsRepositoryInMemory();
    attendantClientUseCase = new CreateAttendantUseCase(
      attendantRepositoryInMemory
    );
  });

  it("should be able to create a new attendant", async () => {
    const attendant = {
      name: "Test name",
      email: "email@test.com",
      password: "test54321",
      role: UserRole.BASIC,
    };

    const attendantCreated = await attendantClientUseCase.execute({
      name: attendant.name,
      email: attendant.email,
      password: attendant.password,
      role: attendant.role,
    });

    expect(attendantCreated).toHaveProperty("id");
  });

  it("should not be able to create a new attendant with a name already registered", async () => {
    const attendant1 = {
      name: "Test name",
      email: "email@test.com",
      password: "test54321",
      role: UserRole.BASIC,
    };

    const attendant2 = {
      name: "Test name2",
      email: "email@test.com",
      password: "test5432122",
      role: UserRole.BASIC,
    };

    await attendantClientUseCase.execute({
      name: attendant1.name,
      email: attendant1.email,
      password: attendant1.password,
      role: attendant1.role,
    });

    await expect(
      attendantClientUseCase.execute({
        name: attendant2.name,
        email: attendant2.email,
        password: attendant2.password,
        role: attendant2.role,
      })
    ).rejects.toEqual(new AppError("Attendant already exists!"));
  });
});

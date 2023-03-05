import { inject, injectable } from "tsyringe";
import { IAttendantsRepository } from "@modules/attendants/repositories/IAttendantsRepository";
import { Attendant } from "@modules/attendants/infra/typeorm/entities/Attendant";

@injectable()
class ListAttendantUseCase {
  constructor(
    @inject("AttendantsRepository")
    private attendantsRepository: IAttendantsRepository
  ) {}

  async execute(): Promise<Attendant[]> {
    const attendants = await this.attendantsRepository.list();

    console.log(attendants);
    return attendants;
  }
}

export { ListAttendantUseCase };

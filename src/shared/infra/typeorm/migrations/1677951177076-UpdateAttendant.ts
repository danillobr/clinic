import { Attendant } from "@modules/attendant/infra/typeorm/entities/Attendant";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAttendant1677951177076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("attendant", "attendants");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("attendants", "attendant");
  }
}

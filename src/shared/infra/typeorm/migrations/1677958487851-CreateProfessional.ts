import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfessional1677958487851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "professionals",
        columns: [
          {
            name: "id",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "fone",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("professionals");
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateServicesTreatments1678023730220
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "services_treatments",
        columns: [
          {
            name: "treatment_id",
            type: "uuid",
          },
          {
            name: "service_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "services_treatments",
      new TableForeignKey({
        name: "FKTreatmentsService",
        referencedTableName: "treatments",
        referencedColumnNames: ["id"],
        columnNames: ["treatment_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "services_treatments",
      new TableForeignKey({
        name: "FKServicesTreatment",
        referencedTableName: "services",
        referencedColumnNames: ["id"],
        columnNames: ["service_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "services_treatments",
      "FKTreatmentService"
    );

    await queryRunner.dropForeignKey(
      "services_treatments",
      "FKServicesTreatment"
    );

    await queryRunner.dropTable("services_treatments");
  }
}

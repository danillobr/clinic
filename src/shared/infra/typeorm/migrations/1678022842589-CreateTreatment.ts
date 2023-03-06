import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTreatment1678022842589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "treatments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "total_amount",
            type: "numeric",
          },
          {
            name: "total_time_services",
            type: "numeric",
          },
          {
            name: "total_commission",
            type: "numeric",
          },
          {
            name: "client_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "professional_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "begin_time",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
          {
            name: "end_time",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
        ],
        foreignKeys: [
          {
            name: "FKClientTratment",
            referencedTableName: "clients",
            referencedColumnNames: ["id"],
            columnNames: ["client_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKProfessionalTratment",
            referencedTableName: "professionals",
            referencedColumnNames: ["id"],
            columnNames: ["professional_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("treatments");
  }
}

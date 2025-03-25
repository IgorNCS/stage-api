import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSprint1742838517271 implements MigrationInterface {
    name = 'CreateSprint1742838517271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sprint" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "active" boolean NOT NULL, "areaId" uuid, CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "process" ADD "sprintId" integer`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_7a7ddd64764c81c0e18b03045c3" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_7a7ddd64764c81c0e18b03045c3"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "sprintId"`);
        await queryRunner.query(`DROP TABLE "sprint"`);
    }

}

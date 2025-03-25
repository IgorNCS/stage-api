import { MigrationInterface, QueryRunner } from "typeorm";

export class EditSprint1742838683584 implements MigrationInterface {
    name = 'EditSprint1742838683584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "sprintId"`);
        await queryRunner.query(`ALTER TABLE "process" ADD "sprintId" uuid`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "sprintId"`);
        await queryRunner.query(`ALTER TABLE "process" ADD "sprintId" integer`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSPRINT1742920328666 implements MigrationInterface {
    name = 'RemoveSPRINT1742920328666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "sprintId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" ADD "sprintId" uuid`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

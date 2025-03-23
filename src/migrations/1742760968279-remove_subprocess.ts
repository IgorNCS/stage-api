import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSubprocess1742760968279 implements MigrationInterface {
    name = 'RemoveSubprocess1742760968279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" ADD "parentProcessId" uuid`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_73193d2fed4d1f74b415dd2c58e" FOREIGN KEY ("parentProcessId") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_73193d2fed4d1f74b415dd2c58e"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "parentProcessId"`);
    }

}

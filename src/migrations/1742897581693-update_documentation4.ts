import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDocumentation41742897581693 implements MigrationInterface {
    name = 'UpdateDocumentation41742897581693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "tools"`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "tools" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "tools"`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "tools" text array`);
    }

}

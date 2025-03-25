import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDocumentation21742896661165 implements MigrationInterface {
    name = 'UpdateDocumentation21742896661165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" ADD "tools" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "tools"`);
    }

}

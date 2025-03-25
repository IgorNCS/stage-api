import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDocumentation1742896130072 implements MigrationInterface {
    name = 'UpdateDocumentation1742896130072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "url_image"`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "documentText" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "documentText"`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "url_image" character varying`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "description" text`);
    }

}

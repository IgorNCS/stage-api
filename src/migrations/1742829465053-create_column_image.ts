import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnImage1742829465053 implements MigrationInterface {
    name = 'CreateColumnImage1742829465053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" ADD "url_image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "url_image"`);
    }

}

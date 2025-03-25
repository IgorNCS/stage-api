import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDocumentation31742896792796 implements MigrationInterface {
    name = 'UpdateDocumentation31742896792796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" ALTER COLUMN "active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documentation" ALTER COLUMN "active" DROP DEFAULT`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class EditSprint31742841223625 implements MigrationInterface {
    name = 'EditSprint31742841223625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "description" SET NOT NULL`);
    }

}

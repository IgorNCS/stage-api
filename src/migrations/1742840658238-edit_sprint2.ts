import { MigrationInterface, QueryRunner } from "typeorm";

export class EditSprint21742840658238 implements MigrationInterface {
    name = 'EditSprint21742840658238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."sprint_status_enum" AS ENUM('AWAITING', 'STARTED', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "status" "public"."sprint_status_enum" NOT NULL DEFAULT 'AWAITING'`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."sprint_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "description"`);
    }

}

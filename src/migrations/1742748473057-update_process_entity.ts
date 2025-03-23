import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProcessEntity1742748473057 implements MigrationInterface {
    name = 'UpdateProcessEntity1742748473057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."subprocess_status_enum" AS ENUM('DRAFT', 'PENDING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED', 'FAILED', 'REVIEW')`);
        await queryRunner.query(`CREATE TABLE "subprocess" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "systems_tools" text array, "responsible_people" text array, "associated_documentation" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL DEFAULT true, "status" "public"."subprocess_status_enum" NOT NULL DEFAULT 'DRAFT', "processId" uuid, "parentSubprocessId" uuid, CONSTRAINT "PK_64a57d9c9c11a7db82aaf0f27c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."process_status_enum" AS ENUM('DRAFT', 'PENDING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED', 'FAILED', 'REVIEW')`);
        await queryRunner.query(`CREATE TABLE "process" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "systems_tools" text array, "responsible_people" text array, "associated_documentation" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL DEFAULT true, "status" "public"."process_status_enum" NOT NULL DEFAULT 'DRAFT', "areaId" uuid, CONSTRAINT "PK_d5e3ab0f6df55ee74ca24967952" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subprocess" ADD CONSTRAINT "FK_277071e07cc0b9f832c93b08e98" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subprocess" ADD CONSTRAINT "FK_4dac73d96afb175d9b5696c2894" FOREIGN KEY ("parentSubprocessId") REFERENCES "subprocess"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_d4ede1078fc268b280941d63e1c" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_d4ede1078fc268b280941d63e1c"`);
        await queryRunner.query(`ALTER TABLE "subprocess" DROP CONSTRAINT "FK_4dac73d96afb175d9b5696c2894"`);
        await queryRunner.query(`ALTER TABLE "subprocess" DROP CONSTRAINT "FK_277071e07cc0b9f832c93b08e98"`);
        await queryRunner.query(`DROP TABLE "process"`);
        await queryRunner.query(`DROP TYPE "public"."process_status_enum"`);
        await queryRunner.query(`DROP TABLE "subprocess"`);
        await queryRunner.query(`DROP TYPE "public"."subprocess_status_enum"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1742738866330 implements MigrationInterface {
    name = 'SchemaUpdate1742738866330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "role" character varying NOT NULL DEFAULT 'EMPLOYEER', "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

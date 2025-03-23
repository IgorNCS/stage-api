import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAreaRelation1742745283664 implements MigrationInterface {
    name = 'UpdateUserAreaRelation1742745283664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "area" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_areas" ("user_id" uuid NOT NULL, "area_id" uuid NOT NULL, CONSTRAINT "PK_323fc6ae648f77a0b2a46e51dca" PRIMARY KEY ("user_id", "area_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5e1ce357ce140e895e7be7964d" ON "user_areas" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef6d23d49a9557d8b96ba93f14" ON "user_areas" ("area_id") `);
        await queryRunner.query(`ALTER TABLE "user_areas" ADD CONSTRAINT "FK_5e1ce357ce140e895e7be7964df" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_areas" ADD CONSTRAINT "FK_ef6d23d49a9557d8b96ba93f14b" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_areas" DROP CONSTRAINT "FK_ef6d23d49a9557d8b96ba93f14b"`);
        await queryRunner.query(`ALTER TABLE "user_areas" DROP CONSTRAINT "FK_5e1ce357ce140e895e7be7964df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef6d23d49a9557d8b96ba93f14"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e1ce357ce140e895e7be7964d"`);
        await queryRunner.query(`DROP TABLE "user_areas"`);
        await queryRunner.query(`DROP TABLE "area"`);
    }

}

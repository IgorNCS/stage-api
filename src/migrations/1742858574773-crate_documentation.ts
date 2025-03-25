import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateDocumentation1742858574773 implements MigrationInterface {
    name = 'CrateDocumentation1742858574773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "documentation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "url_image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "active" boolean NOT NULL, CONSTRAINT "PK_5bd6f5f1b06e11515e4174b020f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documentation_areas" ("area_id" uuid NOT NULL, "documentation_id" uuid NOT NULL, CONSTRAINT "PK_424722f313927efaf4c2dcb4f4e" PRIMARY KEY ("area_id", "documentation_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec1ff5dc7d0cf3aa1b07b0f95d" ON "documentation_areas" ("area_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ccb793d076d9d87bd26e54910" ON "documentation_areas" ("documentation_id") `);
        await queryRunner.query(`CREATE TABLE "documentation_processes" ("process_id" uuid NOT NULL, "documentation_id" uuid NOT NULL, CONSTRAINT "PK_41aed2220c7e09e51fc10d52da0" PRIMARY KEY ("process_id", "documentation_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ce4cde30d07b77fb465b938393" ON "documentation_processes" ("process_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_20f6833abc01238413b0b82a9d" ON "documentation_processes" ("documentation_id") `);
        await queryRunner.query(`CREATE TABLE "process_documentations_documentation" ("processId" uuid NOT NULL, "documentationId" uuid NOT NULL, CONSTRAINT "PK_0a8fea2d33d7356e115ca95b33e" PRIMARY KEY ("processId", "documentationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dad71d4fa695c3a450a3305d2c" ON "process_documentations_documentation" ("processId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f34ae4c1406953c8105fd1d94" ON "process_documentations_documentation" ("documentationId") `);
        await queryRunner.query(`CREATE TABLE "area_documentations_documentation" ("areaId" uuid NOT NULL, "documentationId" uuid NOT NULL, CONSTRAINT "PK_d276078895988de63c8e173420c" PRIMARY KEY ("areaId", "documentationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea1eaf04455a21421d26471ba2" ON "area_documentations_documentation" ("areaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6748966107ed2eaba6bc533e9d" ON "area_documentations_documentation" ("documentationId") `);
        await queryRunner.query(`ALTER TABLE "documentation_areas" ADD CONSTRAINT "FK_ec1ff5dc7d0cf3aa1b07b0f95db" FOREIGN KEY ("area_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "documentation_areas" ADD CONSTRAINT "FK_6ccb793d076d9d87bd26e549103" FOREIGN KEY ("documentation_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documentation_processes" ADD CONSTRAINT "FK_ce4cde30d07b77fb465b938393c" FOREIGN KEY ("process_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "documentation_processes" ADD CONSTRAINT "FK_20f6833abc01238413b0b82a9df" FOREIGN KEY ("documentation_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_documentations_documentation" ADD CONSTRAINT "FK_dad71d4fa695c3a450a3305d2cd" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_documentations_documentation" ADD CONSTRAINT "FK_3f34ae4c1406953c8105fd1d945" FOREIGN KEY ("documentationId") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_documentations_documentation" ADD CONSTRAINT "FK_ea1eaf04455a21421d26471ba2f" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations_documentation" ADD CONSTRAINT "FK_6748966107ed2eaba6bc533e9df" FOREIGN KEY ("documentationId") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area_documentations_documentation" DROP CONSTRAINT "FK_6748966107ed2eaba6bc533e9df"`);
        await queryRunner.query(`ALTER TABLE "area_documentations_documentation" DROP CONSTRAINT "FK_ea1eaf04455a21421d26471ba2f"`);
        await queryRunner.query(`ALTER TABLE "process_documentations_documentation" DROP CONSTRAINT "FK_3f34ae4c1406953c8105fd1d945"`);
        await queryRunner.query(`ALTER TABLE "process_documentations_documentation" DROP CONSTRAINT "FK_dad71d4fa695c3a450a3305d2cd"`);
        await queryRunner.query(`ALTER TABLE "documentation_processes" DROP CONSTRAINT "FK_20f6833abc01238413b0b82a9df"`);
        await queryRunner.query(`ALTER TABLE "documentation_processes" DROP CONSTRAINT "FK_ce4cde30d07b77fb465b938393c"`);
        await queryRunner.query(`ALTER TABLE "documentation_areas" DROP CONSTRAINT "FK_6ccb793d076d9d87bd26e549103"`);
        await queryRunner.query(`ALTER TABLE "documentation_areas" DROP CONSTRAINT "FK_ec1ff5dc7d0cf3aa1b07b0f95db"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6748966107ed2eaba6bc533e9d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea1eaf04455a21421d26471ba2"`);
        await queryRunner.query(`DROP TABLE "area_documentations_documentation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f34ae4c1406953c8105fd1d94"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dad71d4fa695c3a450a3305d2c"`);
        await queryRunner.query(`DROP TABLE "process_documentations_documentation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_20f6833abc01238413b0b82a9d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce4cde30d07b77fb465b938393"`);
        await queryRunner.query(`DROP TABLE "documentation_processes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ccb793d076d9d87bd26e54910"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec1ff5dc7d0cf3aa1b07b0f95d"`);
        await queryRunner.query(`DROP TABLE "documentation_areas"`);
        await queryRunner.query(`DROP TABLE "documentation"`);
    }

}

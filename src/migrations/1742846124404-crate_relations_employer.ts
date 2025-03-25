import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateRelationsEmployer1742846124404 implements MigrationInterface {
    name = 'CrateRelationsEmployer1742846124404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "area_responsables_user" ("areaId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8c18a236a4830ae538b8ccb9a15" PRIMARY KEY ("areaId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf6e1d8a020606435a55f0c105" ON "area_responsables_user" ("areaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7cd51bf53ba21ca25821eb51e9" ON "area_responsables_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "area_employers_user" ("areaId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_14ebb799a74baa2608f8d643e17" PRIMARY KEY ("areaId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_057a62e3900eef673a83d6b3b8" ON "area_employers_user" ("areaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d152fa858e1f63d27b754acc7" ON "area_employers_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_employer_areas" ("user_id" uuid NOT NULL, "area_id" uuid NOT NULL, CONSTRAINT "PK_a931f11378d446db4b0b86dc494" PRIMARY KEY ("user_id", "area_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fc918df7bba56e9ab4ec404c14" ON "user_employer_areas" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_deba879a5346c492b64e5efe53" ON "user_employer_areas" ("area_id") `);
        await queryRunner.query(`ALTER TABLE "area_responsables_user" ADD CONSTRAINT "FK_bf6e1d8a020606435a55f0c105f" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_responsables_user" ADD CONSTRAINT "FK_7cd51bf53ba21ca25821eb51e94" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_employers_user" ADD CONSTRAINT "FK_057a62e3900eef673a83d6b3b83" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_employers_user" ADD CONSTRAINT "FK_3d152fa858e1f63d27b754acc78" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" ADD CONSTRAINT "FK_fc918df7bba56e9ab4ec404c140" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" ADD CONSTRAINT "FK_deba879a5346c492b64e5efe533" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employer_areas" DROP CONSTRAINT "FK_deba879a5346c492b64e5efe533"`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" DROP CONSTRAINT "FK_fc918df7bba56e9ab4ec404c140"`);
        await queryRunner.query(`ALTER TABLE "area_employers_user" DROP CONSTRAINT "FK_3d152fa858e1f63d27b754acc78"`);
        await queryRunner.query(`ALTER TABLE "area_employers_user" DROP CONSTRAINT "FK_057a62e3900eef673a83d6b3b83"`);
        await queryRunner.query(`ALTER TABLE "area_responsables_user" DROP CONSTRAINT "FK_7cd51bf53ba21ca25821eb51e94"`);
        await queryRunner.query(`ALTER TABLE "area_responsables_user" DROP CONSTRAINT "FK_bf6e1d8a020606435a55f0c105f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_deba879a5346c492b64e5efe53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc918df7bba56e9ab4ec404c14"`);
        await queryRunner.query(`DROP TABLE "user_employer_areas"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d152fa858e1f63d27b754acc7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_057a62e3900eef673a83d6b3b8"`);
        await queryRunner.query(`DROP TABLE "area_employers_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7cd51bf53ba21ca25821eb51e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf6e1d8a020606435a55f0c105"`);
        await queryRunner.query(`DROP TABLE "area_responsables_user"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateRelationsEmployer21742846468854 implements MigrationInterface {
    name = 'CrateRelationsEmployer21742846468854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employer_areas" DROP CONSTRAINT "FK_fc918df7bba56e9ab4ec404c140"`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" DROP CONSTRAINT "FK_deba879a5346c492b64e5efe533"`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" ADD CONSTRAINT "FK_deba879a5346c492b64e5efe533" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" ADD CONSTRAINT "FK_fc918df7bba56e9ab4ec404c140" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employer_areas" DROP CONSTRAINT "FK_fc918df7bba56e9ab4ec404c140"`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" DROP CONSTRAINT "FK_deba879a5346c492b64e5efe533"`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" ADD CONSTRAINT "FK_deba879a5346c492b64e5efe533" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_employer_areas" ADD CONSTRAINT "FK_fc918df7bba56e9ab4ec404c140" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

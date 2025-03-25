import { MigrationInterface, QueryRunner } from "typeorm";

export class CrateRelationsEmployer31742846559881 implements MigrationInterface {
    name = 'CrateRelationsEmployer31742846559881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_areas" DROP CONSTRAINT "FK_5e1ce357ce140e895e7be7964df"`);
        await queryRunner.query(`ALTER TABLE "user_areas" DROP CONSTRAINT "FK_ef6d23d49a9557d8b96ba93f14b"`);
        await queryRunner.query(`ALTER TABLE "user_areas" ADD CONSTRAINT "FK_ef6d23d49a9557d8b96ba93f14b" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_areas" ADD CONSTRAINT "FK_5e1ce357ce140e895e7be7964df" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_areas" DROP CONSTRAINT "FK_5e1ce357ce140e895e7be7964df"`);
        await queryRunner.query(`ALTER TABLE "user_areas" DROP CONSTRAINT "FK_ef6d23d49a9557d8b96ba93f14b"`);
        await queryRunner.query(`ALTER TABLE "user_areas" ADD CONSTRAINT "FK_ef6d23d49a9557d8b96ba93f14b" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_areas" ADD CONSTRAINT "FK_5e1ce357ce140e895e7be7964df" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class NomeDaMigracao1742741734631 implements MigrationInterface {
    name = 'NomeDaMigracao1742741734631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "active" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "active"`);
    }

}

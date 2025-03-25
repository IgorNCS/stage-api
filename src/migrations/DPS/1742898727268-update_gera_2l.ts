import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGera2l1742898727268 implements MigrationInterface {
    name = 'UpdateGera2l1742898727268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "area_documentations" ("documentation_id" uuid NOT NULL, "area_id" uuid NOT NULL, CONSTRAINT "PK_fa589a1713b06e2a50dc145f4bc" PRIMARY KEY ("documentation_id", "area_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a395965d646aa32677291a9736" ON "area_documentations" ("documentation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_96b1a68440287eaa5b8bd8cedf" ON "area_documentations" ("area_id") `);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_a395965d646aa32677291a9736c" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_a395965d646aa32677291a9736c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96b1a68440287eaa5b8bd8cedf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a395965d646aa32677291a9736"`);
        await queryRunner.query(`DROP TABLE "area_documentations"`);
    }

}

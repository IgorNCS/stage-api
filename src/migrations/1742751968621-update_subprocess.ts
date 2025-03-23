import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSubprocess1742751968621 implements MigrationInterface {
    name = 'UpdateSubprocess1742751968621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subprocess_responsible_people_user" ("subprocessId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_eb046d7096318ccf414f9d08c4e" PRIMARY KEY ("subprocessId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb096d97e71ce9618fff976228" ON "subprocess_responsible_people_user" ("subprocessId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1f9c4e9ba09498c0bd6e50acc" ON "subprocess_responsible_people_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "process_responsible_people_user" ("processId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_26e2e62398e6fa21f6a0b0f1597" PRIMARY KEY ("processId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ceac0bd448af21b8b9b860f2f" ON "process_responsible_people_user" ("processId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa00b0a4b7ce98dbcbacf361b0" ON "process_responsible_people_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_process" ("user_id" uuid NOT NULL, "process_id" uuid NOT NULL, CONSTRAINT "PK_c0c3a01d5afcd74bf66f98f1e25" PRIMARY KEY ("user_id", "process_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_653075a040503626588050c126" ON "user_process" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6412dad938f6fec9fcbe469ea4" ON "user_process" ("process_id") `);
        await queryRunner.query(`CREATE TABLE "user_subprocess" ("user_id" uuid NOT NULL, "subprocess_id" uuid NOT NULL, CONSTRAINT "PK_4f57c82eae674223dc5459624b9" PRIMARY KEY ("user_id", "subprocess_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_060ffdc698bc05d3d25f0aabd6" ON "user_subprocess" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_59febddd3aa041a01768336b73" ON "user_subprocess" ("subprocess_id") `);
        await queryRunner.query(`ALTER TABLE "subprocess" DROP COLUMN "responsible_people"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "responsible_people"`);
        await queryRunner.query(`ALTER TABLE "subprocess_responsible_people_user" ADD CONSTRAINT "FK_eb096d97e71ce9618fff976228c" FOREIGN KEY ("subprocessId") REFERENCES "subprocess"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subprocess_responsible_people_user" ADD CONSTRAINT "FK_a1f9c4e9ba09498c0bd6e50acc9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people_user" ADD CONSTRAINT "FK_6ceac0bd448af21b8b9b860f2f7" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people_user" ADD CONSTRAINT "FK_fa00b0a4b7ce98dbcbacf361b00" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_process" ADD CONSTRAINT "FK_653075a040503626588050c1266" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_process" ADD CONSTRAINT "FK_6412dad938f6fec9fcbe469ea4b" FOREIGN KEY ("process_id") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_subprocess" ADD CONSTRAINT "FK_060ffdc698bc05d3d25f0aabd6c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_subprocess" ADD CONSTRAINT "FK_59febddd3aa041a01768336b73b" FOREIGN KEY ("subprocess_id") REFERENCES "subprocess"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_subprocess" DROP CONSTRAINT "FK_59febddd3aa041a01768336b73b"`);
        await queryRunner.query(`ALTER TABLE "user_subprocess" DROP CONSTRAINT "FK_060ffdc698bc05d3d25f0aabd6c"`);
        await queryRunner.query(`ALTER TABLE "user_process" DROP CONSTRAINT "FK_6412dad938f6fec9fcbe469ea4b"`);
        await queryRunner.query(`ALTER TABLE "user_process" DROP CONSTRAINT "FK_653075a040503626588050c1266"`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people_user" DROP CONSTRAINT "FK_fa00b0a4b7ce98dbcbacf361b00"`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people_user" DROP CONSTRAINT "FK_6ceac0bd448af21b8b9b860f2f7"`);
        await queryRunner.query(`ALTER TABLE "subprocess_responsible_people_user" DROP CONSTRAINT "FK_a1f9c4e9ba09498c0bd6e50acc9"`);
        await queryRunner.query(`ALTER TABLE "subprocess_responsible_people_user" DROP CONSTRAINT "FK_eb096d97e71ce9618fff976228c"`);
        await queryRunner.query(`ALTER TABLE "process" ADD "responsible_people" text array`);
        await queryRunner.query(`ALTER TABLE "subprocess" ADD "responsible_people" text array`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59febddd3aa041a01768336b73"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_060ffdc698bc05d3d25f0aabd6"`);
        await queryRunner.query(`DROP TABLE "user_subprocess"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6412dad938f6fec9fcbe469ea4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_653075a040503626588050c126"`);
        await queryRunner.query(`DROP TABLE "user_process"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fa00b0a4b7ce98dbcbacf361b0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ceac0bd448af21b8b9b860f2f"`);
        await queryRunner.query(`DROP TABLE "process_responsible_people_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a1f9c4e9ba09498c0bd6e50acc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb096d97e71ce9618fff976228"`);
        await queryRunner.query(`DROP TABLE "subprocess_responsible_people_user"`);
    }

}

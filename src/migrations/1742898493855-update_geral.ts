import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGeral1742898493855 implements MigrationInterface {
    name = 'UpdateGeral1742898493855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "documentation_areas_area" ("documentation_id" uuid NOT NULL, "area_id" uuid NOT NULL, CONSTRAINT "PK_eb47512a751a2f3159f4e94ad17" PRIMARY KEY ("documentation_id", "area_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e7a45a3f32d0bde5c9709e8ba7" ON "documentation_areas_area" ("documentation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0db52c210744b4a5c5433f7e4" ON "documentation_areas_area" ("area_id") `);
        await queryRunner.query(`CREATE TABLE "documentation_processes_process" ("documentation_id" uuid NOT NULL, "process_id" uuid NOT NULL, CONSTRAINT "PK_caa964f7b4c935485d300f10b83" PRIMARY KEY ("documentation_id", "process_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e8ef850cf269eb8ec5c7c4561" ON "documentation_processes_process" ("documentation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_44d6b6196c64f787fc5b8b201f" ON "documentation_processes_process" ("process_id") `);
        await queryRunner.query(`CREATE TABLE "process_responsible_people" ("processId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_01756290bf651179362ecfa823d" PRIMARY KEY ("processId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_801f923b2b4a907abcf53df6bb" ON "process_responsible_people" ("processId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8fd38e99170932816500af4368" ON "process_responsible_people" ("userId") `);
        await queryRunner.query(`CREATE TABLE "process_documentations" ("processId" uuid NOT NULL, "documentationId" uuid NOT NULL, CONSTRAINT "PK_ef4bfd0df08ea4390253003723e" PRIMARY KEY ("processId", "documentationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_019268c2e226bfbf597164b0f5" ON "process_documentations" ("processId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca32514d8091a59d237be36748" ON "process_documentations" ("documentationId") `);
        await queryRunner.query(`CREATE TABLE "area_users_responsables" ("area_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_1fbeb94478f864ad25218294939" PRIMARY KEY ("area_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b762cbc26a3e4a1fae55b3ff36" ON "area_users_responsables" ("area_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac124e4ce7f3c8014d0c1430c1" ON "area_users_responsables" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "area_users_employers" ("area_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_a42a41a4d300eb5c114446039f2" PRIMARY KEY ("area_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf3bbaae752954d613c78c7a4b" ON "area_users_employers" ("area_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a9c200119aab40f30cad36d01" ON "area_users_employers" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "area_documentations" ("areaId" uuid NOT NULL, "documentationId" uuid NOT NULL, CONSTRAINT "PK_7592cae991636279b9119f6530d" PRIMARY KEY ("areaId", "documentationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_39160ec66ad6c486cbcfb3c416" ON "area_documentations" ("areaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd909816ce86a94ee3570a7235" ON "area_documentations" ("documentationId") `);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "associated_documentation"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "tools"`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "tools" text array`);
        await queryRunner.query(`ALTER TABLE "documentation_areas_area" ADD CONSTRAINT "FK_e7a45a3f32d0bde5c9709e8ba7d" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "documentation_areas_area" ADD CONSTRAINT "FK_c0db52c210744b4a5c5433f7e41" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documentation_processes_process" ADD CONSTRAINT "FK_2e8ef850cf269eb8ec5c7c45612" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "documentation_processes_process" ADD CONSTRAINT "FK_44d6b6196c64f787fc5b8b201f9" FOREIGN KEY ("process_id") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people" ADD CONSTRAINT "FK_801f923b2b4a907abcf53df6bbb" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people" ADD CONSTRAINT "FK_8fd38e99170932816500af4368a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_019268c2e226bfbf597164b0f51" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_ca32514d8091a59d237be36748b" FOREIGN KEY ("documentationId") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_users_responsables" ADD CONSTRAINT "FK_b762cbc26a3e4a1fae55b3ff362" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_users_responsables" ADD CONSTRAINT "FK_ac124e4ce7f3c8014d0c1430c1b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_users_employers" ADD CONSTRAINT "FK_cf3bbaae752954d613c78c7a4b4" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_users_employers" ADD CONSTRAINT "FK_7a9c200119aab40f30cad36d018" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_39160ec66ad6c486cbcfb3c416f" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_cd909816ce86a94ee3570a72351" FOREIGN KEY ("documentationId") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_cd909816ce86a94ee3570a72351"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_39160ec66ad6c486cbcfb3c416f"`);
        await queryRunner.query(`ALTER TABLE "area_users_employers" DROP CONSTRAINT "FK_7a9c200119aab40f30cad36d018"`);
        await queryRunner.query(`ALTER TABLE "area_users_employers" DROP CONSTRAINT "FK_cf3bbaae752954d613c78c7a4b4"`);
        await queryRunner.query(`ALTER TABLE "area_users_responsables" DROP CONSTRAINT "FK_ac124e4ce7f3c8014d0c1430c1b"`);
        await queryRunner.query(`ALTER TABLE "area_users_responsables" DROP CONSTRAINT "FK_b762cbc26a3e4a1fae55b3ff362"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_ca32514d8091a59d237be36748b"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_019268c2e226bfbf597164b0f51"`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people" DROP CONSTRAINT "FK_8fd38e99170932816500af4368a"`);
        await queryRunner.query(`ALTER TABLE "process_responsible_people" DROP CONSTRAINT "FK_801f923b2b4a907abcf53df6bbb"`);
        await queryRunner.query(`ALTER TABLE "documentation_processes_process" DROP CONSTRAINT "FK_44d6b6196c64f787fc5b8b201f9"`);
        await queryRunner.query(`ALTER TABLE "documentation_processes_process" DROP CONSTRAINT "FK_2e8ef850cf269eb8ec5c7c45612"`);
        await queryRunner.query(`ALTER TABLE "documentation_areas_area" DROP CONSTRAINT "FK_c0db52c210744b4a5c5433f7e41"`);
        await queryRunner.query(`ALTER TABLE "documentation_areas_area" DROP CONSTRAINT "FK_e7a45a3f32d0bde5c9709e8ba7d"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "tools"`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "tools" text`);
        await queryRunner.query(`ALTER TABLE "process" ADD "associated_documentation" text array`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd909816ce86a94ee3570a7235"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39160ec66ad6c486cbcfb3c416"`);
        await queryRunner.query(`DROP TABLE "area_documentations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a9c200119aab40f30cad36d01"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf3bbaae752954d613c78c7a4b"`);
        await queryRunner.query(`DROP TABLE "area_users_employers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac124e4ce7f3c8014d0c1430c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b762cbc26a3e4a1fae55b3ff36"`);
        await queryRunner.query(`DROP TABLE "area_users_responsables"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca32514d8091a59d237be36748"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_019268c2e226bfbf597164b0f5"`);
        await queryRunner.query(`DROP TABLE "process_documentations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8fd38e99170932816500af4368"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_801f923b2b4a907abcf53df6bb"`);
        await queryRunner.query(`DROP TABLE "process_responsible_people"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44d6b6196c64f787fc5b8b201f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2e8ef850cf269eb8ec5c7c4561"`);
        await queryRunner.query(`DROP TABLE "documentation_processes_process"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0db52c210744b4a5c5433f7e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7a45a3f32d0bde5c9709e8ba7"`);
        await queryRunner.query(`DROP TABLE "documentation_areas_area"`);
    }

}

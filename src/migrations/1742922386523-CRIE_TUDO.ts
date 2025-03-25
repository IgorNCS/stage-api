import { MigrationInterface, QueryRunner } from "typeorm";

export class CRIETUDO1742922386523 implements MigrationInterface {
    name = 'CRIETUDO1742922386523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_ca32514d8091a59d237be36748b"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_019268c2e226bfbf597164b0f51"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_cd909816ce86a94ee3570a72351"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_39160ec66ad6c486cbcfb3c416f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_019268c2e226bfbf597164b0f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca32514d8091a59d237be36748"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39160ec66ad6c486cbcfb3c416"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd909816ce86a94ee3570a7235"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "sprintId"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_ef4bfd0df08ea4390253003723e"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_ca32514d8091a59d237be36748b" PRIMARY KEY ("documentationId")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "processId"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_ca32514d8091a59d237be36748b"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "documentationId"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "PK_7592cae991636279b9119f6530d"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "PK_cd909816ce86a94ee3570a72351" PRIMARY KEY ("documentationId")`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP COLUMN "areaId"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "PK_cd909816ce86a94ee3570a72351"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP COLUMN "documentationId"`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "documentation_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_890b35075976a508b6e46952a91" PRIMARY KEY ("documentation_id")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "process_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_890b35075976a508b6e46952a91"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_f0e140c69b31d9e9b7156a25c79" PRIMARY KEY ("documentation_id", "process_id")`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD "area_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "PK_96b1a68440287eaa5b8bd8cedf5" PRIMARY KEY ("area_id")`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD "documentation_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "PK_96b1a68440287eaa5b8bd8cedf5"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "PK_fa589a1713b06e2a50dc145f4bc" PRIMARY KEY ("area_id", "documentation_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_890b35075976a508b6e46952a9" ON "process_documentations" ("documentation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_72aef3b897b356ee8783a813c4" ON "process_documentations" ("process_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_96b1a68440287eaa5b8bd8cedf" ON "area_documentations" ("area_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a395965d646aa32677291a9736" ON "area_documentations" ("documentation_id") `);
        await queryRunner.query(`ALTER TABLE "documentation" ADD CONSTRAINT "FK_a967a979ca021871aa7f37a9ab8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_890b35075976a508b6e46952a91" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_72aef3b897b356ee8783a813c4c" FOREIGN KEY ("process_id") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_a395965d646aa32677291a9736c" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_a395965d646aa32677291a9736c"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_72aef3b897b356ee8783a813c4c"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_890b35075976a508b6e46952a91"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP CONSTRAINT "FK_a967a979ca021871aa7f37a9ab8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a395965d646aa32677291a9736"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96b1a68440287eaa5b8bd8cedf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72aef3b897b356ee8783a813c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_890b35075976a508b6e46952a9"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "PK_fa589a1713b06e2a50dc145f4bc"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "PK_96b1a68440287eaa5b8bd8cedf5" PRIMARY KEY ("area_id")`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP COLUMN "documentation_id"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "PK_96b1a68440287eaa5b8bd8cedf5"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP COLUMN "area_id"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_f0e140c69b31d9e9b7156a25c79"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_890b35075976a508b6e46952a91" PRIMARY KEY ("documentation_id")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "process_id"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_890b35075976a508b6e46952a91"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "documentation_id"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD "documentationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "PK_cd909816ce86a94ee3570a72351" PRIMARY KEY ("documentationId")`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD "areaId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "PK_cd909816ce86a94ee3570a72351"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "PK_7592cae991636279b9119f6530d" PRIMARY KEY ("areaId", "documentationId")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "documentationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_ca32514d8091a59d237be36748b" PRIMARY KEY ("documentationId")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "processId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_ca32514d8091a59d237be36748b"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_ef4bfd0df08ea4390253003723e" PRIMARY KEY ("processId", "documentationId")`);
        await queryRunner.query(`ALTER TABLE "process" ADD "sprintId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_cd909816ce86a94ee3570a7235" ON "area_documentations" ("documentationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_39160ec66ad6c486cbcfb3c416" ON "area_documentations" ("areaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca32514d8091a59d237be36748" ON "process_documentations" ("documentationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_019268c2e226bfbf597164b0f5" ON "process_documentations" ("processId") `);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_39160ec66ad6c486cbcfb3c416f" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_cd909816ce86a94ee3570a72351" FOREIGN KEY ("documentationId") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_019268c2e226bfbf597164b0f51" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_ca32514d8091a59d237be36748b" FOREIGN KEY ("documentationId") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_ccdb8bfd2afd1f4ef2fea80d7fd" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

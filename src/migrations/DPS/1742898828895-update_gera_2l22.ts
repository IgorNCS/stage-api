import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGera2l221742898828895 implements MigrationInterface {
    name = 'UpdateGera2l221742898828895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_ca32514d8091a59d237be36748b"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_019268c2e226bfbf597164b0f51"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_a395965d646aa32677291a9736c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_019268c2e226bfbf597164b0f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca32514d8091a59d237be36748"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_ef4bfd0df08ea4390253003723e"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_ca32514d8091a59d237be36748b" PRIMARY KEY ("documentationId")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "processId"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_ca32514d8091a59d237be36748b"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "documentationId"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "documentation_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_890b35075976a508b6e46952a91" PRIMARY KEY ("documentation_id")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "process_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_890b35075976a508b6e46952a91"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_f0e140c69b31d9e9b7156a25c79" PRIMARY KEY ("documentation_id", "process_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_890b35075976a508b6e46952a9" ON "process_documentations" ("documentation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_72aef3b897b356ee8783a813c4" ON "process_documentations" ("process_id") `);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_a395965d646aa32677291a9736c" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_890b35075976a508b6e46952a91" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_72aef3b897b356ee8783a813c4c" FOREIGN KEY ("process_id") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_72aef3b897b356ee8783a813c4c"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_890b35075976a508b6e46952a91"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_a395965d646aa32677291a9736c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72aef3b897b356ee8783a813c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_890b35075976a508b6e46952a9"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_f0e140c69b31d9e9b7156a25c79"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_890b35075976a508b6e46952a91" PRIMARY KEY ("documentation_id")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "process_id"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_890b35075976a508b6e46952a91"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP COLUMN "documentation_id"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "documentationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_ca32514d8091a59d237be36748b" PRIMARY KEY ("documentationId")`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD "processId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "PK_ca32514d8091a59d237be36748b"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "PK_ef4bfd0df08ea4390253003723e" PRIMARY KEY ("processId", "documentationId")`);
        await queryRunner.query(`CREATE INDEX "IDX_ca32514d8091a59d237be36748" ON "process_documentations" ("documentationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_019268c2e226bfbf597164b0f5" ON "process_documentations" ("processId") `);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_a395965d646aa32677291a9736c" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_019268c2e226bfbf597164b0f51" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_ca32514d8091a59d237be36748b" FOREIGN KEY ("documentationId") REFERENCES "documentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

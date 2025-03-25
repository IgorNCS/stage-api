import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserDocumentation21742910347563 implements MigrationInterface {
    name = 'AddUserDocumentation21742910347563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_72aef3b897b356ee8783a813c4c"`);
        await queryRunner.query(`ALTER TABLE "process_documentations" DROP CONSTRAINT "FK_890b35075976a508b6e46952a91"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5"`);
        await queryRunner.query(`ALTER TABLE "area_documentations" DROP CONSTRAINT "FK_a395965d646aa32677291a9736c"`);
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
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_a395965d646aa32677291a9736c" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "area_documentations" ADD CONSTRAINT "FK_96b1a68440287eaa5b8bd8cedf5" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_890b35075976a508b6e46952a91" FOREIGN KEY ("documentation_id") REFERENCES "documentation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "process_documentations" ADD CONSTRAINT "FK_72aef3b897b356ee8783a813c4c" FOREIGN KEY ("process_id") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

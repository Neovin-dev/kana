import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1786905283835 implements MigrationInterface {
    name = 'InitialSchema1786905283835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "section" ("id" SERIAL NOT NULL, "title" text NOT NULL, "boardId" integer NOT NULL, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "userId" integer NOT NULL, "issueId" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "boardId" integer NOT NULL, "sectionId" integer NOT NULL, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue_mapping" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "issueId" integer NOT NULL, CONSTRAINT "UQ_77bdb59a680b6c11dd6efbfbaee" UNIQUE ("userId", "issueId"), CONSTRAINT "PK_76cc88dca2f353a5f4e10b31280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "name" text NOT NULL, "passwordHash" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."membership_role_enum" AS ENUM('member', 'admin')`);
        await queryRunner.query(`CREATE TABLE "membership" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "organizationId" integer NOT NULL, "role" "public"."membership_role_enum" NOT NULL DEFAULT 'member', CONSTRAINT "UQ_db862050fbbf3f0a15b2a8f2245" UNIQUE ("userId", "organizationId"), CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "title" text NOT NULL, "organizationId" integer NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_05dc09669e1196c2bff8c76686c" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_87df5cc9d40c252f38b85618be1" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_25e5570b6501cb5ec2585098069" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_7a529416e064ac65d0278a99188" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_mapping" ADD CONSTRAINT "FK_28304a45b4e899b0a60e995b7aa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_mapping" ADD CONSTRAINT "FK_ef429a0465d394b355f69d7eaf1" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "membership" ADD CONSTRAINT "FK_4c62c8a7ba2337d6d6ffcd8eb6d" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_71f9dedce5b473d6583d71fab67" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_71f9dedce5b473d6583d71fab67"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_4c62c8a7ba2337d6d6ffcd8eb6d"`);
        await queryRunner.query(`ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`);
        await queryRunner.query(`ALTER TABLE "issue_mapping" DROP CONSTRAINT "FK_ef429a0465d394b355f69d7eaf1"`);
        await queryRunner.query(`ALTER TABLE "issue_mapping" DROP CONSTRAINT "FK_28304a45b4e899b0a60e995b7aa"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_7a529416e064ac65d0278a99188"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_25e5570b6501cb5ec2585098069"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_87df5cc9d40c252f38b85618be1"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_05dc09669e1196c2bff8c76686c"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "membership"`);
        await queryRunner.query(`DROP TYPE "public"."membership_role_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "issue_mapping"`);
        await queryRunner.query(`DROP TABLE "issue"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "section"`);
    }

}

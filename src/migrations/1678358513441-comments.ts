import { MigrationInterface, QueryRunner } from 'typeorm';

export class comments1678358513441 implements MigrationInterface {
  name = 'comments1678358513441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" RENAME COLUMN "body" TO "comment"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" RENAME COLUMN "comment" TO "body"`,
    );
  }
}

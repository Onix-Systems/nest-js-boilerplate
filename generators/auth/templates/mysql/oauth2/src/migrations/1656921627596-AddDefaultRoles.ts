import { MigrationInterface, QueryRunner } from 'typeorm';

import { RolesEnum } from '@decorators/roles.decorator';

export class AddDefaultRoles1656921627596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values([
        {
          name: RolesEnum.USER,
        },
        {
          name: RolesEnum.ADMIN,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('roles')
      .where('name IN(:...names)', { names: [RolesEnum.USER, RolesEnum.ADMIN] })
      .execute();
  }
}

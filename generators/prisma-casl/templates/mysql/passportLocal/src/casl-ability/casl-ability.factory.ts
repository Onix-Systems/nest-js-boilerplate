import {
  AbilityBuilder, ExtractSubjectType, InferSubjects, MongoAbility, createMongoAbility,
} from '@casl/ability';
import { RolesEnum } from '@decorators/roles.decorator';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@prisma/client';
import Action from './enums/casl-action.enum';
import { UserResponseEntity } from '@v1/users/entities/user-response.entity';

type Subjects = InferSubjects<typeof UserResponseEntity> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export default class CaslAbilityFactory {
  createForUser(user: Omit<UserEntity, 'roles'> & { roles: string[] }) {
    const { can, build, cannot } = new AbilityBuilder<
      MongoAbility<[Action, Subjects]>
    >(createMongoAbility);

    if (user.roles.includes(RolesEnum.ADMIN)) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    return build({
      detectSubjectType: (item: any) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

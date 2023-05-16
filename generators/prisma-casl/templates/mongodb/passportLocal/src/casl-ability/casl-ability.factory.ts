import {
  AbilityBuilder, ExtractSubjectType, InferSubjects, MongoAbility, createMongoAbility,
} from '@casl/ability';
import { RolesEnum } from '@decorators/roles.decorator';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import UserDto from '@v1/users/dto/user.dto';
import Action from './enums/casl-action.enum';

type Subjects = InferSubjects<typeof UserDto> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export default class CaslAbilityFactory {
  createForUser(user: User) {
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

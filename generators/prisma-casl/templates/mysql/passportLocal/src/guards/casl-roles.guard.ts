import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import CaslAbilityFactory from '../casl-ability/casl-ability.factory';
import Action from '../casl-ability/enums/casl-action.enum';


@Injectable()
export default class PoliciesGuard implements CanActivate {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.Manage, 'all')) return true;

    return false;
  }
}

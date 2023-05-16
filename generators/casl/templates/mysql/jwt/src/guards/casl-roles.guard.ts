import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CaslAbilityFactory from '../casl-ability/casl-ability.factory';
import Action from '../casl-ability/enums/casl-action.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class PoliciesGuard implements CanActivate {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();

    const token = headers.authorization.split(' ')[1];

    const user = await this.jwtService.verifyAsync(
      token,
      { secret: this.configService.get<string>('ACCESS_TOKEN') || '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282' });

    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.Manage, 'all')) return true;

    return false;
  }
}
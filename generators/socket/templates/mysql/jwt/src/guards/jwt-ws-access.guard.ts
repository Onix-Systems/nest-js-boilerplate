import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export default class JwtWSAccessGuard extends AuthGuard('accessTokenWS') {}
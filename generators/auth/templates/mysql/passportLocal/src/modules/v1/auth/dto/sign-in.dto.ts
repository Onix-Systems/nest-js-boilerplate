import { PartialType } from '@nestjs/swagger';
import SignUpDto from './sign-up.dto';

export default class SignInDto extends PartialType(SignUpDto) {}

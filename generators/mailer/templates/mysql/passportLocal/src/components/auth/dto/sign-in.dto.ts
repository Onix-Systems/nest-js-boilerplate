import { PartialType } from '@nestjs/swagger';
import SignUpDto from '@components/auth/dto/sign-up.dto';

export default class SignInDto extends PartialType(SignUpDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { Username } from '../interfaces/username.interface';
import { Email } from '../interfaces/email.interface';
import { Photo } from '../interfaces/photo.interface';

export default class UserProfileDto {
  @ApiProperty({ type: String })
  readonly email: string | null = '';

  @ApiProperty({ type: Array })
  readonly photos: Photo[] = [];

  @ApiProperty({ type: [] })
  readonly emails: Email[] = [];

  @ApiProperty({ type: String })
  readonly name: Username = {
    givenName: null,
    familyName: null,
  };
}

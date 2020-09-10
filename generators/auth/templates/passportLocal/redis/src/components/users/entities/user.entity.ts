import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: String })
  @ObjectIdColumn()
  _id: ObjectID;

  @ApiProperty({ type: String })
  @Column()
  password: string;

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  email: string;

  @ApiProperty({ type: Boolean })
  @Column()
  verified: boolean;
}

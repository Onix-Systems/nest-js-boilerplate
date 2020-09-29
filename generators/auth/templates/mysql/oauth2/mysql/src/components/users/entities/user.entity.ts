import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @Column()
  picture: string;

  @ApiProperty({ type: String })
  @Column()
  firstName: string;

  @ApiProperty({ type: String })
  @Column()
  lastName: string;

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  email: string;

  @ApiProperty({ type: Boolean })
  @Column()
  verified: boolean;
}

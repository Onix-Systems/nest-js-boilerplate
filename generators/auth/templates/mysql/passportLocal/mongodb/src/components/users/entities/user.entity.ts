import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  password: string;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  email: string;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'tinyint' })
  verified: boolean;
}

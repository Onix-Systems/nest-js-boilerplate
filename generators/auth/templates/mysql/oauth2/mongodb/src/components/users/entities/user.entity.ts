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
  readonly id: number = 0;

  @ApiProperty({ type: String })
  @Column()
  readonly picture: string = '';

  @ApiProperty({ type: String })
  @Column()
  readonly firstName: string = '';

  @ApiProperty({ type: String })
  @Column()
  readonly lastName: string = '';

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  readonly email: string = '';

  @ApiProperty({ type: Boolean })
  @Column()
  readonly verified: boolean = false;
}

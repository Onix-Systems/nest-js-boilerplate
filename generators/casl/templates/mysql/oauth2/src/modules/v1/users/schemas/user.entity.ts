import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import RoleEntity from '@v1/roles/schemas/role.entity';

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

  @ManyToMany(() => RoleEntity, {
    cascade: true,
  })
  @JoinTable({
    name: 'users_roles',
  })
  readonly roles!: RoleEntity[];
}

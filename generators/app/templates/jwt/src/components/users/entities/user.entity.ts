import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID,
  Index,
} from 'typeorm';

@Entity('users')
export default class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  password: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  verified: boolean;
}

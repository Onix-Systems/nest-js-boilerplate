import { Entity, Column, ObjectIdColumn, ObjectID, Index } from 'typeorm';

@Entity('users')
export default class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  picture: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  verified: boolean;
}

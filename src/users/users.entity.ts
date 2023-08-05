import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Customer, (e) => e.user)
  customer: Customer;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  usertype_id: number;

  @CreateDateColumn()
  created: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @BeforeInsert()
  beforeInsertActions() {
    this.usertype_id = 1;
  }

  @Column({ nullable: true })
  deviceToken: string;

  @Column({ nullable: true })
  deviceType: string;
}

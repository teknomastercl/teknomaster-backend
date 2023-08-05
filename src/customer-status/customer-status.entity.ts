import { IsEmail } from 'class-validator';
import { CustomerSubStatus } from 'src/customer-sub-status/customer-sub-status.entity';
import { Customer } from 'src/customer/customer.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CustomerStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => CustomerSubStatus, (e) => e.customerStatus)
  customerSubStatus: CustomerSubStatus[];
}

import { IsEmail } from 'class-validator';
import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerStatus } from 'src/customer-status/customer-status.entity';
import { Customer } from 'src/customer/customer.entity';
import { CustomerSubStatus } from 'src/customer-sub-status/customer-sub-status.entity';

@Entity()
export class CustomerHistorySubEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Customer, (e) => e)
  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerSubStatus, (e) => e)
  @Column({ name: 'customer_sub_status_id' })
  customerSubStatusId: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  check: boolean;

  @Column({ type: 'datetime', nullable: true })
  date: string;

  @CreateDateColumn()
  created: string;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from 'src/customer/customer.entity';
import { CustomerSubStatus } from 'src/customer-sub-status/customer-sub-status.entity';

@Entity()
export class CustomerHistorySubStatus {
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

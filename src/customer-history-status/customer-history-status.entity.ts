import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerStatus } from 'src/customer-status/customer-status.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity()
export class CustomerHistoryStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (e) => e)
  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerStatus, (e) => e)
  @Column({ name: 'customer_status_id' })
  customerStatusId: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  check: boolean;

  @Column({ type: 'datetime', nullable: true })
  date: string;

  @CreateDateColumn()
  created: string;
}

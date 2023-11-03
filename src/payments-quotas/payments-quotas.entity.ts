import { Customer } from 'src/customer/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentsQuotas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  poisiton: number;

  @Column({ type: 'datetime', nullable: true })
  date: string;

  @ManyToOne(() => Customer, (e) => e.id)
  customer: Customer | number;

  @CreateDateColumn()
  created: string;
}

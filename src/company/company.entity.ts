import { Customer } from 'src/customer/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  img: string;

  @ManyToOne(() => Customer, (e) => e.company)
  customer: Customer | number;

  @CreateDateColumn()
  create_date: string;
}

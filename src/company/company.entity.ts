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
  image: string;

  @ManyToOne(() => Customer, (e) => e)
  @Column({ name: 'user_id' })
  customer: string;

  @CreateDateColumn()
  create_date: string;
}

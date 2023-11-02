import { IsEmail } from 'class-validator';
import { Customer } from 'src/customer/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PreCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  comment: string;

  @OneToOne(() => Customer, (e) => e.preCustomer)
  customer: Customer | number;

  @CreateDateColumn()
  created: string;
}

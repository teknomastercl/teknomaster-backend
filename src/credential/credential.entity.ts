import { Company } from 'src/company/company.entity';
import { Customer } from 'src/customer/customer.entity';
import { Product } from 'src/product/product.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  user: string;

  @Column({ nullable: true })
  pass: string;

  @ManyToOne(() => Customer, (e) => e.id)
  customer: Customer | number;

  @ManyToOne(() => Company, (e) => e.id)
  company: Company | number;

  @ManyToOne(() => Product, (e) => e.id)
  product: Product | number;

  @ManyToOne(() => Users, (e) => e.id)
  users: Users | number;
}

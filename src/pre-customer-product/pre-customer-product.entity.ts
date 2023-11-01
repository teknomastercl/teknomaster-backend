import { PreCustomer } from 'src/pre-customer/pre-customer.entity';
import { Product } from 'src/product/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PreCustomerProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PreCustomer, (e) => e.id)
  preCustomer: PreCustomer | number;

  @ManyToOne(() => Product, (e) => e.id)
  product: Product | number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created: string;
}

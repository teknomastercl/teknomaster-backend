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
import { ProductStatus } from 'src/product-status/product-status.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class ProductHistoryStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (e) => e)
  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => ProductStatus, (e) => e)
  @Column({ name: 'product_status_id' })
  productStatusId: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  check: boolean;

  @Column({ type: 'datetime', nullable: true })
  date: string;

  @CreateDateColumn()
  created: string;
}

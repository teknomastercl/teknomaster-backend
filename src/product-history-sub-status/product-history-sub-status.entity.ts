import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/product/product.entity';
import { ProductSubStatus } from 'src/product-sub-status/product-sub-status.entity';

@Entity()
export class ProductHistorySubStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, (e) => e)
  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => ProductSubStatus, (e) => e)
  @Column({ name: 'product_sub_status_id' })
  productSubStatusId: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  check: boolean;

  @Column({ type: 'datetime', nullable: true })
  date: string;

  @CreateDateColumn()
  created: string;
}

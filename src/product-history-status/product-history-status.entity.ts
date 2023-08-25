import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from 'src/product-status/product-status.entity';
import { CompanyProduct } from 'src/company-product/company-product.entity';
import { ProductSubStatus } from 'src/product-sub-status/product-sub-status.entity';

@Entity()
export class ProductHistoryStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CompanyProduct, (e) => e.id)
  companyProduct: CompanyProduct | number;

  @ManyToOne(() => ProductStatus, (e) => e.id)
  productStatus: ProductStatus | number;

  @ManyToOne(() => ProductSubStatus, (e) => e.id)
  productSubStatus: ProductSubStatus | number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  check: boolean;

  @Column({ type: 'datetime', nullable: true })
  date: string;

  @CreateDateColumn()
  created: string;
}

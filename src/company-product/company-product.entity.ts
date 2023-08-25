import { Company } from 'src/company/company.entity';
import { ProductStatus } from 'src/product-status/product-status.entity';
import { ProductSubStatus } from 'src/product-sub-status/product-sub-status.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Product, (e) => e.id)
  product: Product | number;

  @ManyToOne(() => Company, (e) => e.id)
  company: Company | number;

  @ManyToOne(() => ProductStatus, (e) => e.id)
  productStatus: ProductStatus | number;

  @ManyToOne(() => ProductSubStatus, (e) => e.id)
  productSubStatus: ProductSubStatus | number;
}

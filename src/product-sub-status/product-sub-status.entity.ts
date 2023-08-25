import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from 'src/product-status/product-status.entity';

@Entity()
export class ProductSubStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => ProductStatus, (e) => e.productSubStatus)
  productStatus: ProductStatus | number;
}

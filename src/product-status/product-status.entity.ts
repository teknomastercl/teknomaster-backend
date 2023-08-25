import { ProductSubStatus } from 'src/product-sub-status/product-sub-status.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ProductSubStatus, (e) => e.productStatus)
  productSubStatus: ProductSubStatus[];
}

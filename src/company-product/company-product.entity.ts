import { Company } from 'src/company/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (e) => e.id)
  product: Product | number;

  @ManyToOne(() => Company, (e) => e.id)
  company: Company | number;
}

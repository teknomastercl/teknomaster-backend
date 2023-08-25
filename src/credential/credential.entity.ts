import { Company } from 'src/company/company.entity';
import { Customer } from 'src/customer/customer.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  pass: string;

  @ManyToOne(() => Customer, (e) => e.id)
  customer: Customer | number;

  @ManyToOne(() => Company, (e) => e.id)
  company: Company | number;

  @ManyToOne(() => Product, (e) => e.id)
  product: Product | number;

  @ManyToOne(() => User, (e) => e.id)
  user: User | number;
}

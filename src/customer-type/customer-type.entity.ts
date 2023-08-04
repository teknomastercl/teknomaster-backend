import { Customer } from 'src/customer/customer.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class CustomerType {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Customer, (e) => e.customerType)
  customer: Customer[];
}

import { CustomerSubStatus } from 'src/customer-sub-status/customer-sub-status.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => CustomerSubStatus, (e) => e.customerStatus)
  customerSubStatus: CustomerSubStatus[];
}

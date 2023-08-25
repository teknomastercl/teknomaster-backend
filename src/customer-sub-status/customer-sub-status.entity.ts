import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerStatus } from 'src/customer-status/customer-status.entity';

@Entity()
export class CustomerSubStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => CustomerStatus, (e) => e.customerSubStatus)
  customerStatus: CustomerStatus;
}

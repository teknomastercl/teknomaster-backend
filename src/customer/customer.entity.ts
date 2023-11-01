import { IsEmail } from 'class-validator';
import { Company } from 'src/company/company.entity';
import { CustomerStatus } from 'src/customer-status/customer-status.entity';
import { CustomerSubStatus } from 'src/customer-sub-status/customer-sub-status.entity';
import { CustomerType } from 'src/customer-type/customer-type.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  img: string;

  @ManyToOne(() => CustomerType, (e) => e.customer)
  customerType: CustomerType | number;

  @ManyToOne(() => CustomerStatus, (e) => e.id)
  customerStatus: CustomerStatus | number;

  @ManyToOne(() => CustomerSubStatus, (e) => e.id)
  customerSubStatus: CustomerSubStatus | number;

  @OneToMany(() => Company, (e) => e.customer)
  company: Company;

  @CreateDateColumn()
  created: string;

  @BeforeInsert()
  async beforeInsertActions() {
    this.customerType = 0;
  }
}

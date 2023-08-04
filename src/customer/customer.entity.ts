import { IsEmail } from 'class-validator';
import { CustomerType } from 'src/customer-type/customer-type.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @OneToOne(() => Users, (e) => e.id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

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

  @Column({ nullable: true })
  instagram: string;

  @ManyToOne(() => CustomerType, (e) => e.customer)
  customerType: CustomerType;
}

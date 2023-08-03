import { IsEmail } from 'class-validator';
import { City } from 'src/city/city.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  img: string;
}

import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PreCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  created: string;
}

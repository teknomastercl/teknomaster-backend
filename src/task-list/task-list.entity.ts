import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}

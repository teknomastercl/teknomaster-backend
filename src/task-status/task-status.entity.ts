import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TaskStatus {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;
}

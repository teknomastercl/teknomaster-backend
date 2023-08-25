import { Customer } from 'src/customer/customer.entity';
import { TaskList } from 'src/task-list/task-list.entity';
import { TaskStatus } from 'src/task-status/task-status.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  note: string;

  @Column({ nullable: true, type: 'datetime' })
  date: string;

  @Column({ nullable: true, type: 'datetime' })
  time: string;

  @ManyToOne(() => Customer, (e) => e.id)
  customer: Customer | number;

  @ManyToOne(() => User, (e) => e.id)
  user: User | number;

  @Column({ default: 1 })
  prority: number;

  @Column({ default: 0.1 })
  points: number;

  @ManyToOne(() => TaskList, (e) => e.id)
  taskList: TaskList | number;

  @ManyToOne(() => TaskStatus, (e) => e.id)
  taskStatus: TaskStatus | number;
}

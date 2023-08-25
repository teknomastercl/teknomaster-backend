export class createTaskDto {
  readonly title: string;
  readonly note?: string;
  readonly date?: string;
  readonly time?: string;
  readonly customer?: number;
  readonly user?: number;
  readonly prority?: number;
  readonly points?: number;
  readonly taskList?: number;
  readonly taskStatus?: number;
}

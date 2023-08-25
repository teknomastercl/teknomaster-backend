import { IsNotEmpty } from 'class-validator';

export class UploadDeviceDto {
  @IsNotEmpty()
  readonly userId: number | string;

  readonly deviceToken: string;

  readonly deviceType: 'ios' | 'android';
}

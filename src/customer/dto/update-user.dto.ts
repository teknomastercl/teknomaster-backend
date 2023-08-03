export class UpdateCustomerDto {
  readonly user_id: number | string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: string;
  readonly password?: string;
  readonly city?: number;
  readonly club?: number | Array<number>;
  readonly racket?: number;
  readonly shoes?: number;
  readonly descripition?: string;
  readonly gender?: 'm' | 'f';
  readonly size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  img?: string;
  readonly category?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

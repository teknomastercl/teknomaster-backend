export class createCustomerDto {
  readonly name?: string;
  readonly phone?: string;
  readonly email?: string;
  readonly img?: string;
  readonly customerType?: number;
  readonly customerStatus?: number;
  readonly customerSubStatus?: number;
  readonly companyTitle?: string;
  readonly companyImg?: string;
  readonly companyInstagram?: string;
  readonly preClientId?: number;
  readonly products?: Products[];
}

interface Products {
  product: number;
  description: string;
}

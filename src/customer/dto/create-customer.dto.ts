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
  readonly paymentQuotas?: Quotas[];
}

interface Products {
  product: number;
  description: string;
}

interface Quotas {
  position: number;
  date: string;
}

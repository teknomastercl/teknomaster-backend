export class createPreCustomerDto {
  readonly name?: string;
  readonly phone?: string;
  readonly instagram?: string;
  readonly email?: string;
  readonly reference?: string;
  readonly comment?: string;
  readonly products?: Products[];
}
class Products {
  readonly product?: number;
  readonly description?: string;
}

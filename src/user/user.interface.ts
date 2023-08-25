export interface UserData {
  email: string;
}

export interface UserRO {
  data: UserData;
  token: string;
  error?: {
    code: number;
    message: string;
  };
}

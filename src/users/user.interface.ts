export interface UserData {
  email: string;
  token: string;
}

export interface UserRO {
  user: UserData;
  error?: {
    code: number;
    message: string;
  };
}

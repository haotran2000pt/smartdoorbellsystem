export interface User {
  username: string;
  email: string;
}

export interface IAuthResponse {
  user: User;
  tokens?: {
    access: string;
    refresh: string;
  };
}

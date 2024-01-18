export class AuthDTO {
  user: any;
  access_token: string;
  email: string;
  password: string;

  constructor(
    user: any,
    access_token: string,
    email: string,
    password: string,
  ) {
    this.user = user;
    this.access_token = access_token;
    this.email = email;
    this.password = password;
  }
}

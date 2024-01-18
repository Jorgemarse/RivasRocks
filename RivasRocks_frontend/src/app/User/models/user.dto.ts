export class UserDTO {
  id?: string;
  access_token?: string;
  name: string;
  surname_1: string;
  surname_2?: string;
  birth_date: Date;
  email: string;
  password: string;
  admin: number | undefined;

  constructor(
    name: string,
    surname_1: string,
    surname_2: string,
    birth_date: Date,
    email: string,
    password: string,
    admin: number
  ) {
    this.name = name;
    this.surname_1 = surname_1;
    this.surname_2 = surname_2;
    this.birth_date = birth_date;
    this.email = email;
    this.password = password;
    admin = admin;
  }
}

export class User {
  id: string;
  email: string;
  password: string;
  username: string;
  role: string;

  constructor(id: string, email: string, password: string, username: string, role: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.role = role;
  }
}

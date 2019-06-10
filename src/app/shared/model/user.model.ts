export class UserModel {
  email: string;
  picture: string;
  name: string;

  constructor(email: string, name: string, picture: string) {
    this.email = email;
    this.picture = picture;
    this.name = name;
  }
}

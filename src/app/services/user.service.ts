import { Subject } from "rxjs";
import { User } from "../models/user.model";

export class UserService {
  users = [
    new User("John", "Doe", "M", "example@gmail.com", "SomethingSomething", new Date("01/01/1970"), "612345678", "France", "Something, Something, Darkside", "1", "#000000", "somePath/to/an/image", "50", false)
  ];

  userSubject = new Subject<User[]>();

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User){
    this.users.push(user);
    this.emitUsers();
  }

  searchUsersByEmail(emailPrefix: string){
    return this.users.filter((user: User) => user.email.startsWith(emailPrefix));
  }
}
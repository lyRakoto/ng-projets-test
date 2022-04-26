import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input() user: User;
  usersSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.userSubject.subscribe(
      (users) => {}
    );

    this.userService.emitUsers();
  }

}

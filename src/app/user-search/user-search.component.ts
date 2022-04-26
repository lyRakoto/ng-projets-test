import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import Tracer from "../bl-gui-tracer/tracer";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  searchEntry: string;
  searchedUsers: User[];
  searchForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.searchForm = this.formBuilder.group({
      'userSearch': ['', Validators.required]
    });
  }

  onUsersSearchChange(){
    this.searchEntry = this.searchForm.get('userSearch').value;
    
    if(this.searchEntry)
      this.searchedUsers = this.userService.searchUsersByEmail(this.searchEntry);
    else
      this.searchedUsers = [];
  }

    tracer = new Tracer();
    trace(event: Event) {
    	this.tracer.trace(event);
    }
}

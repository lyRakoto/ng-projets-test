import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import Tracer from "../bl-gui-tracer/tracer";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      'birthday': ['', Validators.required],
      'telephone': ['', Validators.required],
      'country': ['', Validators.required],
      'bio': '',
      'favoriteNumber': '',
      'favoriteColor': '',
      'agreementLevel': '',
      'avatarImage': '',
      'newsletter': ''
    });
  }

  onSaveUser(){
    this.userService.addUser(new User(
      this.userForm.get('firstName').value,
      this.userForm.get('lastName').value,
      this.userForm.get('gender').value,
      this.userForm.get('email').value,
      this.userForm.get('password').value,
      new Date(this.userForm.get('birthday').value),
      this.userForm.get('telephone').value,
      this.userForm.get('country').value,
      this.userForm.get('bio').value,
      this.userForm.get('favoriteNumber').value,
      this.userForm.get('favoriteColor').value,
      this.userForm.get('avatarImage').value,
      this.userForm.get('agreementLevel').value,
      this.userForm.get('newsletter').value
    ));

    this.router.navigate(['/users']);
  }

    tracer = new Tracer();
    trace(event: Event) {
    	this.tracer.trace(event);
    }
}

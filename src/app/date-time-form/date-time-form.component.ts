import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Tracer from "../bl-gui-tracer/tracer";

@Component({
  selector: 'app-date-time-form',
  templateUrl: './date-time-form.component.html',
  styleUrls: ['./date-time-form.component.css']
})
export class DateTimeFormComponent implements OnInit {

  dateTimeForm: FormGroup
  dateTime: string;
  time: string;
  month: string;
  week: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.dateTimeForm = this.formBuilder.group({
      'dateTime': ['', Validators.required],
      'time': ['', Validators.required],
      'month': ['', Validators.required],
      'week': ['', Validators.required],
    });
  }

  onSubmit(){
    this.dateTime = new Date(this.dateTimeForm.get('dateTime').value).toLocaleDateString();
    this.time = this.dateTimeForm.get('time').value;
    this.month = this.dateTimeForm.get('month').value;
    this.week = this.dateTimeForm.get('week').value;
  }

    tracer = new Tracer();
    trace(event: Event) {
    	this.tracer.trace(event);
    }
}

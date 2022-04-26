import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import Tracer from "../bl-gui-tracer/tracer";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'content': ['', Validators.required]
    });
  }

  onSavePost(){
    this.postService.addPost(new Post(
      this.postForm.get('title').value,
      this.postForm.get('content').value
    ));

    this.router.navigate(['/posts']);
  }

    tracer = new Tracer();
    trace(event: Event) {
    	this.tracer.trace(event);
    }
}

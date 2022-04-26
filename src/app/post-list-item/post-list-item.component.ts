import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import Tracer from "../bl-gui-tracer/tracer";

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  postsSubscription: Subscription;

  constructor(private postService: PostService) { 
  }

  ngOnInit(): void {
    this.postsSubscription = this.postService.postSubject.subscribe(
      (posts) => {}
    );

    this.postService.emitPosts();
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  onLoveIt(){
    this.postService.lovePost(this.post);
  }

  onNotLoveIt(){
    this.postService.dontLovePost(this.post);
  }

  onDelete(){
    this.postService.removePost(this.post);
  }

    tracer = new Tracer();
    trace(event: Event) {
    	this.tracer.trace(event);
    }
}
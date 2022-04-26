import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  postsSubscription: Subscription;

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.postsSubscription = this.postsService.postSubject.subscribe(
      (posts) => this.posts = posts
    );
    this.postsService.emitPosts();
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

}
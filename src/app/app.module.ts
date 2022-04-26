import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { HeaderComponent } from './header/header.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { DateTimeFormComponent } from './date-time-form/date-time-form.component';

import { PostService } from './services/post.service';
import { UserService } from './services/user.service';


const appRoutes: Route[] = [
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'new-user',
    component: NewUserComponent
  },
  {
    path: 'user-search',
    component: UserSearchComponent
  },
  {
    path: 'date-time-form',
    component: DateTimeFormComponent
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostListItemComponent,
    HeaderComponent,
    NewPostComponent,
    NewUserComponent,
    UserListComponent,
    UserListItemComponent,
    UserSearchComponent,
    DateTimeFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

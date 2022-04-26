import { Subject } from "rxjs";
import { Post } from "../models/post.model";

export class PostService {

    posts = [
        new Post('My First Post', 'Something, something, something, dark side...'),
        new Post('My Second Post', 'Sometimes yes, but mostly not.'),
        new Post('Another Post', 'The Good, the Bad, and the what now?')
    ];

    postSubject = new Subject<Post[]>();

    emitPosts(){
        this.postSubject.next(this.posts.slice());
    }

    addPost(post: Post){
        this.posts.push(post);
        this.emitPosts();
    }

    removePost(post: Post){
        const index = this.posts.findIndex(
            (storedPost) => {
                if(storedPost === post)
                    return true;
            }
        );

        this.posts.splice(index, 1);
        this.emitPosts();
    }

    lovePost(post: Post){
        const index = this.posts.findIndex(
            (storedPost) => {
                if(storedPost === post)
                    return true;
            }
        );

        this.posts[index].loveIts++;
        this.emitPosts();
    }

    dontLovePost(post: Post){
        const index = this.posts.findIndex(
            (storedPost) => {
                if(storedPost === post)
                    return true;
            }
        );
        
        this.posts[index].loveIts--;
        this.emitPosts();
    }
}
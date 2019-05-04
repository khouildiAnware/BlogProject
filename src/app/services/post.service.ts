import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import * as firebase from 'firebase/app';
import DataSnapshot = firebase.database.DataSnapshot;

export interface Post {
    title: string;
    content: string;
    loveIts: number;
    created_at: number;
}
@Injectable()
export class PostsService {

    postsSubject = new Subject<Post[]>();

    private posts: Array<Post> = [];

    public constructor(private readonly router: Router) {
        this.getPosts();
    }
   
    public emitPostsSubject() {
        this.postsSubject.next(this.posts);
    }

    public getPosts() {
        firebase.database().ref('/posts')
            .on('value', (data: DataSnapshot) => {
                    this.posts = data.val() ? data.val() : [];
                    this.emitPostsSubject();
                }
            );
    }

    public getOnePost(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/posts/' + id).once('value').then(
                    (data: DataSnapshot) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    public savePosts() {
     firebase.database().ref('/posts').set(this.posts);
    }

    public deletePost(post: Post) {
       const bookIndexToRemove = this.posts.findIndex(
            (postEl) => {
                if (postEl === post) {
                    return true;
                }
            }
        );
        this.posts.splice(bookIndexToRemove, 1);
        this.savePosts();
        this.emitPostsSubject();
    }

    public addPost(newPost: Post) {
       newPost.loveIts = 0;
        newPost.created_at = new Date().getTime();
       this.posts.push(newPost);
        this.savePosts();
        this.emitPostsSubject();
        this.router.navigate(['/posts']);
    }

    public addLoveIts(index: number) {
        this.posts[index].loveIts++;
        this.savePosts();
        this.emitPostsSubject();
    }

    public removeLoveIts(index: number) {
       this.posts[index].loveIts--;
        this.savePosts();
        this.emitPostsSubject();
    }
}

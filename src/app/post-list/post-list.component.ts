import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {Post, PostsService} from '../services/post.service'
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public posts: Array<Post>;
  postsSubscription: Subscription;
  constructor(private postsService :PostsService) {}
  isShown = false;

  public ngOnInit(): void {  

     this.postsSubscription = this.postsService.postsSubject.subscribe(
         posts => {
           this.posts = posts;
         }

     );

     this.postsService.emitPostsSubject();

   
   }
 
   public ngOnDestroy() {
     this.postsSubscription.unsubscribe();
   }

}

import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {Post, PostsService} from '../services/post.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {
  @Input() post: Post;  
  @Input() index: number;

  constructor(public postsService: PostsService) {}

  ngOnInit() {}
 
  addLove(index: number) {
    this.postsService.addLoveIts(index);
  }

  removeLove(index: number) {
    this.postsService.removeLoveIts(index);
  }

  getLove() {
    let classCard = 'list-group-item';
    if (this.post.loveIts < 0) {
      classCard += ', list-group-item-danger';
    }
    if (this.post.loveIts > 0) {
      classCard += ', list-group-item-success';
    }
    return classCard;
  }
  removePost(post: Post) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blog!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.postsService.deletePost(post);
        Swal.fire(
          'Deleted!',
          'Your blog has been deleted.',
          'success'
        )
   
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your blog is safe :)',
          'error'
        )
      }
    })
  }
}

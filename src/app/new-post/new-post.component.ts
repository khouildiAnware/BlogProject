import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup} from '@angular/forms';
import {PostsService} from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private fb: FormBuilder,private postService:PostsService) { }

  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.postForm = this.fb.group({
      titre: ['', Validators.required],
      contenu: ['', Validators.required]
    });
  }
  
  onSavePost() {
 
      this.postService.addPost(this.postForm.getRawValue());

    
  }
}

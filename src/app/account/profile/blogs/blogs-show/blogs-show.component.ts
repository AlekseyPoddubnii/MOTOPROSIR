import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../../shared/models/blog.model';
import { BlogsService } from '../../../shared/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { ProfileService } from 'src/app/account/shared/services/profile.service';
import { BlogsCommentService } from 'src/app/account/shared/services/blogs-commet.service';
import { BlogComment } from 'src/app/account/shared/models/comment.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfileComponent } from '../../profile.component';

@Component({
  selector: 'app-blogs-show',
  templateUrl: './blogs-show.component.html',
  styleUrls: ['./blogs-show.component.scss']
})
export class BlogsShowComponent implements OnInit {
  blogs$: Blog[];
  blogs: Blog;
  blogId: any;
  id: any;
  idd: number;
  user: User;
  userId: number;
  user$ = [];
  commentBody: string;
  commentInfo: BlogComment;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.id = JSON.parse(this.id);
      console.log('bloggs', this.id);
      this.getAllUsers();
    });

    let entity: any = localStorage.getItem('entity');
    entity = JSON.parse(entity);
    this.idd = entity.id;


    this.blogsService.refreshBlogs$.
    subscribe(() => {
      this.getAllBlogs();
    });

    this.getAllBlogs();

    this.profileService.refreshUser$.
    subscribe(() => {
      this.getAllUsers();
    });

    this.getAllUsers();

    // this.getComments();
  }

  // send(id) {
  //   console.log('blog id', id);
    // const comment = new FormGroup({
    //   type: new FormControl(),
    //   id: new FormControl(),
    //   comment: new FormControl(),
    // });
    // this.commentInfo = new BlogComment (
    //   comment.value.type = 'blog',
    //   comment.value.id = id,
    //   comment.value.comment = this.commentBody,
    // );
    // console.log(this.commentInfo);
  //   this.blogsCommentServise.postComment(id, this.commentBody);
  // }

  // getComments() {
  //   this.blogsCommentServise.getComments(this.blogs.id);
  // }


  private getAllBlogs() {
    this.blogsService.getBlogs(this.id).
    subscribe(data => this.blogs$ = data);
  }

  private getAllUsers() {
    this.profileService.getUser(this.id).
    subscribe(res => this.user = this.user$[0] = res);
  }

  autogrow() {
    const textArea = document.getElementById('textarea');
    textArea.style.overflow = 'hidden';
    textArea.style.height = '150px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  edit(value) {
      this.blogId = value;
  }

  save(blog: Blog): void {
    this.blogId = null;
    this.blogsService.updateBlogs(blog).subscribe();
  }

  cancel() {
    this.blogId = null;
  }

  delete(blogs: Blog): void {
    if (confirm('Are you sure?')) {
      this.blogs$ = this.blogs$.filter(b => b !== blogs);
      this.blogsService.deleteBlogs(blogs).subscribe();
    }
  }
}

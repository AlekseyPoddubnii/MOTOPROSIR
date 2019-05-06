import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../../shared/models/blog.model';
import { BlogsService } from '../../../shared/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { ProfileService } from 'src/app/account/shared/services/profile.service';

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
  }


  private getAllBlogs() {
    this.blogsService.getBlogs().
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

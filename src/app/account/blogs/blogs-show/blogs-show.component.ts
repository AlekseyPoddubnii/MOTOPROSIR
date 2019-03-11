import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../shared/models/blog.model';
import { BlogsService } from '../../shared/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-blogs-show',
  templateUrl: './blogs-show.component.html',
  styleUrls: ['./blogs-show.component.scss']
})
export class BlogsShowComponent implements OnInit {
  blogs$: Blog[];
  blogs: Blog;
  blogId: any;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.blogsService.refreshBlogs$.
    subscribe(() => {
      this.getAllBlogs();
    });

    this.getAllBlogs();
  }

  private getAllBlogs() {
    this.blogsService.getBlogs().
    subscribe(data => this.blogs$ = data);
  }

  edit(value) {
      this.blogId = value;
      const blogHide = document.getElementById('buttonsToHide');
      blogHide.style.display = 'none';
      const blogContent = document.getElementById('buttonsToUpdate');
      blogContent.style.display = 'block';
  }

  save(blog: Blog): void {
    this.blogId = null;
    this.blogsService.updateBlogs(blog).subscribe();
  }

  cancel() {
    this.blogId = null;
    const blogHide = document.getElementById('buttonsToHide');
    blogHide.style.display = 'block';
    const blogContent = document.getElementById('buttonsToUpdate');
    blogContent.style.display = 'none';
  }

  delete(blogs: Blog): void {
    if (confirm('Are you sure?')) {
      this.blogs$ = this.blogs$.filter(b => b !== blogs);
      this.blogsService.deleteBlogs(blogs).subscribe();
    }
  }
}

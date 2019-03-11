import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../shared/models/blog.model';
import { BlogsService } from '../../shared/services/blogs.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
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

  edit(id: number): void {
    this.blogs$.find(blog => blog.id === id);
    const blogHide = document.getElementById('blogsToHide');
    blogHide.style.display = 'none';
    const blogContent = document.getElementById('blogsToUpdate');
    blogContent.style.display = 'block';
  }

  save(blog: Blog): void {
    this.blogsService.updateBlogs(blog).subscribe();
  }

  cancel() {
    const blogHide = document.getElementById('blogsToHide');
    blogHide.style.display = 'block';
    const blogContent = document.getElementById('blogsToUpdate');
    blogContent.style.display = 'none';
  }

  delete(blogs: Blog): void {
    if (confirm('Are you sure?')) {
      this.blogs$ = this.blogs$.filter(b => b !== blogs);
      this.blogsService.deleteBlogs(blogs).subscribe();
    }
  }
}

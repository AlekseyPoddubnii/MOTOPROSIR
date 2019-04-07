import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BlogsService } from '../../shared/services/blogs.service';
import { Blog } from '../../shared/models/blog.model';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogsCreateForm: FormGroup;
  submitted = false;
  blogsInfo: Blog;

  constructor(
    private formBuilder: FormBuilder,
    private blogsService: BlogsService,
  ) { }

  ngOnInit() {
    this.blogsCreateForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.maxLength(25)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]]
    });
  }

get f() { return this.blogsCreateForm.controls; }



onSubmit() {
    console.log(this.blogsCreateForm.value);

    const currentDate = new Date();
    this.blogsCreateForm.value.created_at = currentDate;

    this.blogsInfo = new Blog (
        this.blogsCreateForm.value.title,
        this.blogsCreateForm.value.description,
        this.blogsCreateForm.value.created_at,
    );
    this.submitted = true;

    if (this.blogsCreateForm.invalid) {
        return;
    }

    this.blogsService.postBlogs(this.blogsInfo).subscribe(
        data => {
            console.log(data);
        },
        error => {
            console.log(error);
        }
    );
  }
}

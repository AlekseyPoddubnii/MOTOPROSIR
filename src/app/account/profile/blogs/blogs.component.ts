import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { BlogsService } from '../../shared/services/blogs.service';
import { Blog } from '../../shared/models/blog.model';
import { ProfileService } from '../../shared/services/profile.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogsCreateForm: FormGroup;
  submitted = false;
  blogsInfo: Blog;
  selectedFile: File;
  res: string;
  url: string;
  imgUrl: any = null;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private blogsService: BlogsService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.blogsCreateForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.maxLength(128)]],
        description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.id = JSON.parse(this.id);
      // console.log('bloggs', this.id);
    });
  }

  get f() { return this.blogsCreateForm.controls; }

  deleteImg() {
    this.imgUrl = null;
    this.selectedFile = null;
  }

  onPictureSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile === null) {
      return;
    } else if (this.selectedFile) {

      document.querySelector('.upload-picture__span').innerHTML = this.selectedFile.name;
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.imgUrl = reader.result;
      };

      const fileName = this.selectedFile.name;
      this.profileService.getUrl(fileName).subscribe(res => {
      console.log('link', res);
      this.url = res.split('?')[0];
      // tslint:disable-next-line:no-shadowed-variable
      this.profileService.postAvatar(res, this.selectedFile).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
            console.log('File is completely uploaded!');
        }
      });
    });
    }

  }

  autogrow() {
    const textArea = document.getElementById('textarea');
    textArea.style.overflow = 'hidden';
    textArea.style.height = '150px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  resetForm() {
    this.blogsCreateForm.reset();
    //   this.blogsCreateForm.setErrors(null);
  }


  onSubmit() {
    console.log(this.blogsCreateForm.value);

    const currentDate = new Date();
    this.blogsCreateForm.value.created_at = currentDate;

    this.blogsInfo = new Blog (
        this.blogsCreateForm.value.title,
        this.blogsCreateForm.value.description,
        this.blogsCreateForm.value.picture = this.url,
        // this.blogsCreateForm.value.created_at,
    );
    this.submitted = true;

    if (this.blogsCreateForm.invalid) {
        return;
    }

    this.blogsService.postBlogs(this.blogsInfo).subscribe(
        data => {
          let control: AbstractControl = null;
          this.blogsCreateForm.reset();
          this.blogsCreateForm.markAsUntouched();
          Object.keys(this.blogsCreateForm.controls).forEach((name) => {
            control = this.blogsCreateForm.controls[name];
            control.setErrors(null);
          });
            console.log(data);
        },
        error => {
            console.log(error);
        }
    );
  }
}

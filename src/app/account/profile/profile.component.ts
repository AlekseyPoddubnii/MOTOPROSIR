import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Avatar } from '../shared/models/photo.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: User;
  user$ = [];
  id: number;
  userId: number;
  selectedFile: File = null;
  avatarUrl: string;
  res: any;
  avatar: string;
  userSettingsInfo: User;
  url: string;
  // tslint:disable-next-line:no-inferrable-types
  show: number = 0;

  blogsLength: number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  currentUserSubscription: Subscription;
  currentUser: User;



  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.userId = id;
      console.log(id);
      this.getAllUsers();
    });

    let entity: any = localStorage.getItem('entity');
    entity = JSON.parse(entity);
    this.id = entity.id;

    this.profileService.refreshUser$.
    subscribe(() => {
      this.getAllUsers();
    });

    this.getAllUsers();
  }

  private getAllUsers() {
    this.profileService.getUser(this.userId).
    subscribe(res => this.user = this.user$[0] = res);
  }

  showAdd() {
    if (this.show === 1) {
      document.getElementById('addBlog').style.display = 'none';
      this.show = 0;
    } else if (this.show === 0) {
      document.getElementById('addBlog').style.display = 'block';
      this.show = 1;
    }
  }



  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fileName = this.selectedFile.name;
    this.profileService.getUrl(fileName).subscribe(res => {
      console.log('link', res);
      this.res = res;
      this.profileService.postAvatar(res, this.selectedFile).subscribe(response =>
        console.log('liiink', this.res),
      );
      const avatarInfo = new FormGroup({
        email: new FormControl(),
        newPassword: new FormControl(),
        username: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        gender: new FormControl(),
        countery: new FormControl(),
        city: new FormControl(),
        avatar: new FormControl(),
        cover: new FormControl(),
      });
      this.userSettingsInfo = new User (
        avatarInfo.value.email = undefined,
        avatarInfo.value.newPassword = undefined ,
        avatarInfo.value.username = undefined,
        avatarInfo.value.firstName = undefined,
        avatarInfo.value.lastName = undefined,
        avatarInfo.value.gender = undefined,
        avatarInfo.value.country = undefined,
        avatarInfo.value.city = undefined,
        avatarInfo.value.avatar = this.res.split('?')[0],
        avatarInfo.value.cover = undefined,
      );
      console.log(this.userSettingsInfo);
      this.profileService.putAvatar(this.userSettingsInfo).subscribe(response => {
        console.log(res);
      });
    });
  }

  onFileSelectedd(event) {
    this.selectedFile = <File>event.target.files[0];
    const fileName = this.selectedFile.name;
    this.profileService.getUrl(fileName).subscribe(res => {
      console.log('link', res);
      this.res = res;
      this.profileService.postAvatar(this.res, this.selectedFile).subscribe(response => {
        console.log(response);
        console.log('liiink', this.res);
      });
      const avatarInfo = new FormGroup({
        email: new FormControl(),
        newPassword: new FormControl(),
        username: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        gender: new FormControl(),
        countery: new FormControl(),
        city: new FormControl(),
        avatar: new FormControl(),
        cover: new FormControl(),
      });
      this.userSettingsInfo = new User (
        avatarInfo.value.email = undefined,
        avatarInfo.value.newPassword = undefined ,
        avatarInfo.value.username = undefined,
        avatarInfo.value.firstName = undefined,
        avatarInfo.value.lastName = undefined,
        avatarInfo.value.gender = undefined,
        avatarInfo.value.country = undefined,
        avatarInfo.value.city = undefined,
        avatarInfo.value.avatar = undefined,
        avatarInfo.value.cover = this.res.split('?')[0],
      );
      console.log(this.userSettingsInfo);
      this.profileService.putCover(this.userSettingsInfo).subscribe(
        data => {
          // window.location.reload();
        console.log(data);
      },
      error => {
        console.log(error);
      }
      );
    });
  }

}




import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';
import { FormGroup } from '@angular/forms';
import { Photo } from '../shared/models/photo.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: User;
  user$ = [];
  id: number;
  selectedFile: File = null;
  avatarUrl: string;

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

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fd: FormData = new FormData();
    fd.append('avatar', this.selectedFile, this.selectedFile.name);
    console.log(fd);
    const fileName = this.selectedFile.name;
    this.profileService.getUrl(fileName).subscribe(res => {
      this.profileService.postPhoto(res, fd).subscribe(response =>
        console.log(response));
    });
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.profileService.getUser(id).subscribe(user => this.user = this.user$[0] = user);
    });

    let entity: any = localStorage.getItem('entity');
    entity = JSON.parse(entity);
    this.id = entity.id;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: User;
  user$ = [];
  id: number;


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
  context: CanvasRenderingContext2D;

  @ViewChild('canvasPreview') canvasPreview;

  @ViewChild('avatarPreview') avatarPreview;

  previewCover(e: any): void {
    const canvas = this.canvasPreview.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 250, 1170);

    const render = new FileReader();
    render.onload = function(event: any) {
      const img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
      img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
  }

  previewAvatar(e: any): void {
    const canvas = this.avatarPreview.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 175, 175);

    const render = new FileReader();
    render.onload = function(event: any) {
      const img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
      };
      img.src = event.target.result;
    };
    render.readAsDataURL(e.target.files[0]);
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

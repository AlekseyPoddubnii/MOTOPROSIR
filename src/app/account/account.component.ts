import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {


  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
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

  }
}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Follower } from '../../shared/models/follower.model';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {
  followers$: Follower[];
  following$: Follower[];
  follower: Follower;
  userId: number;


  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
  ) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.userId = id;
      console.log(id);
    });

    this.getAllFollowing();
  }

  getAllFollowing() {
    this.profileService.getFollowing(this.userId).
    subscribe(res => this.follower = this.following$ = res);
  }

}

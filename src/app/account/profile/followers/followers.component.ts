import { Component, OnInit } from '@angular/core';
import { Follower } from '../../shared/models/follower.model';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  followers$: Follower[];
  following$: Follower[];
  follower: Follower;
  userId: number;


  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.userId = id;
      console.log(id);
    });

    this.getAllFollowers();

  }

  getAllFollowers() {
    this.profileService.getFollowers(this.userId).
    subscribe(res => this.follower = this.followers$ = res);
  }

}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Tweet } from "../interfaces/tweet";
import { User } from "../interfaces/user";
import { AuthService } from "../services/auth.service";
import { TweetService } from "../services/tweet.service";

@Component({
  selector: "app-user-tweet",
  templateUrl: "./user-tweet.component.html",
  styleUrls: ["./user-tweet.component.css"],
})
export class UserTweetComponent implements OnInit {
  currentRouteUsername: string;
  tweetList: Tweet[] = [];
  userList: User[] = [];
  user: User;
  constructor(
    private router: Router,
    private authService: AuthService,
    private tweetService: TweetService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentRouteUsername = this.route.snapshot.paramMap.get("username");
    this.tweetService
      .getAllTweetsByUsername(this.currentRouteUsername)
      .subscribe((data: any) => {
        this.tweetList = data;
      });

    this.tweetService
      .getUsersByUsername(this.currentRouteUsername)
      .subscribe((data: any) => {
        this.userList = data;
        this.user = this.userList[0];
      });
  }
}

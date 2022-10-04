import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../interfaces/user";
import { AuthService } from "../services/auth.service";
import { TweetService } from "../services/tweet.service";

@Component({
  selector: "app-search-user",
  templateUrl: "./search-user.component.html",
  styleUrls: ["./search-user.component.css"],
})
export class SearchUserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tweetService: TweetService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("login");
    }
    // this.currentUser = this.authService.getCurrentUser();
    this.tweetService
      .getAllUsers()
      .subscribe((data: any) => (this.userList = data));
  }

  // currentUser: User;
  // userList: User[];
  userList: User[];
  term: string;
}

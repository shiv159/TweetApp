import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { TweetService } from "../services/tweet.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  username: string = "";

  loading = false;
  successmsg = false;
  errormsg = false;

  constructor(
    private tweeetService: TweetService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  onClick() {
    console.log(this.username);
    console.log("Submitted");
    // this.submitted = true;
    this.loading = true;
    this.authService.forgotPassword(this.username).subscribe((data: any) => {
      this.loading = false;
      console.log(data.resetStatus);
      console.log(data.newPassword);

      if (
        (data.resetStatus !== undefined || data.resetStatus !== null) &&
        data.resetStatus == "success"
      ) {
        this.successmsg = true;
        this.errormsg = false;
        // this.router.navigate([''])
      } else {
        this.successmsg = false;
        this.errormsg = true;
        console.log("username is not correct");
      }
      //   this.passwordResetComplete = true;
    });
  }

  // console.log(this.passwordMap);
  // console.log(this.passwordMap.get("newPassword"));
}

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  //HttpRequest for out going request and HttpHandler for response
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401(not auathorize) response returned from api
          //if request will not be succesfull it will return error
          alert("You need to login first");
          this.auth.logout();
          location.reload();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }),
    );
  }
}

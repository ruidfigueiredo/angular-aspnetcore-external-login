import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class Interceptor401Service implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(null,
      (error: HttpErrorResponse) => {        
        if (error.status === 401)
          this.accountService.setUserAsNotAuthenticated();
      }));
  }
}

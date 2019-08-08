import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _isUserAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isUserAuthenticated: Observable<boolean> = this._isUserAuthenticatedSubject.asObservable();
  
  constructor(@Inject(DOCUMENT) private document: Document, private httpClient: HttpClient) { }

  updateUserAuthenticationStatus(){
    return this.httpClient.get<boolean>(`${environment.apiUrl}/home/isAuthenticated`, {withCredentials: true}).pipe(tap(isAuthenticated => {
      this._isUserAuthenticatedSubject.next(isAuthenticated);
    }));    
  }

  setUserAsNotAuthenticated(){
    this._isUserAuthenticatedSubject.next(false);
  }

  login() {
    this.document.location.href = "http://localhost:5000/account/SignInWithGoogle";
  }

  logout() {
    this.document.location.href = "http://localhost:5000/account/logout";
  }
  
}

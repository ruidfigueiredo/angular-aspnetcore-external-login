import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AccountService } from '../account.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  subscription: Subscription;
  userName: string;

  constructor(private httpClient: HttpClient, private accountService: AccountService) { }

  ngOnInit() {
    this.subscription = this.accountService.isUserAuthenticated.subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
      if (this.isUserAuthenticated) {
        this.httpClient.get(`${environment.apiUrl}/home/name`, { responseType: 'text', withCredentials: true }).subscribe(theName => {
          this.userName = theName;
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.accountService.logout();
  }

  simulateFailedCall() {
    this.httpClient.get(`${environment.apiUrl}/home/fail`).subscribe();
  }

  login() {
    this.accountService.login();
  }

}

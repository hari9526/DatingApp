import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_model/user';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  loggedIn: boolean = false; 
  currentUser$: Observable<User>;
  constructor(public accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }
  logout() {

    this.accountService.logout();
    this.router.navigateByUrl('/user/login');
  }
  
}


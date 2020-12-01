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
  currentUser$: Observable<User>;
  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }
  goToLogin() {
    this.router.navigateByUrl("/user/login");
  }
  logout() {
    alert("SDF");
    this.accountService.logout();
  }
}


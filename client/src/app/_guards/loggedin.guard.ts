import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})

//This is for preventing logged in users from accessing login and register page. 
export class LoggedinGuard implements CanActivate {
  constructor(private accountservice : AccountService,private route : Router) {
  
    
  }
  canActivate(): Observable<boolean> {
    return this.accountservice.currentUser$.pipe(
      map(user=>{
        if(user){       
          this.route.navigate(['/home']);
          return false;         
        }
        else{
          return true; 
        }
                                
      })
    );
  }
  
}

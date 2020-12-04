import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_model/user';
//Service would be available till the application runs in the browser
//Data in a service doesn't get destroyed when we move from one componenet to 
//other.  Data in a component is destroyed when the component is not in use. 
//Services are singleton. 
//A singleton service is a service for which only one instance exists in an app
@Injectable({
  //Services are injectable. It can be injected to other components
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUser = new ReplaySubject<User>(1);
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn$ : Observable<boolean>; 
  currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.loginStatus(); 
    this.isUserLoggedIn$ = this.isLoggedIn.asObservable(); 
   }
//This is for checking whether user is logged when there is a refresh. 
  loginStatus(){ 
     if(localStorage.getItem('user')){
       this.isLoggedIn.next(true);
     }
     else
      this.isLoggedIn.next(false); 
   }
  

  formModel = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });
  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
      if (confirmPasswordCtrl.value != fb.get('Password').value)
        confirmPasswordCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl.setErrors(null);
    }

  }
  setLoginStatus(boolean){

    this.isLoggedIn.next(boolean); 
  }
  register() {
    var body ={
      FirstName : this.formModel.value.FirstName, 
      LastName : this.formModel.value.LastName, 
      Email : this.formModel.value.Email, 
      Password : this.formModel.value.Passwords.Password
    }
    return this.http.post(this.baseUrl + "account/register", body); 

  }

  login(model: any) {
   
    return this.http.post(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setLoginStatus(true); 
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.next(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    
    this.currentUser.next(user);
  }
  
  logout() {
    this.setLoginStatus(false);
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}


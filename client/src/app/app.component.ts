import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_model/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//OnInit is a life hook that is called after constructor. 
export class AppComponent implements OnInit{
  title = 'Hi, Harikrishnan'; 
  users : any; 
  //Angular uses dependency injection 
  //Here we are using constructore injection. 
  constructor(private http: HttpClient, private accountService : AccountService) {

  }; 
  //ngOnInit is the the method in the interface OnInit. 
  //This is called after the construtor. 
  ngOnInit() {
    this.getUsers(); 
    this.setCurrentUser();  
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user')); 
    this.accountService.setCurrentUser(user); 
  }
  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(response => 
      this.users = response , error=>
      console.log(error) ); 
  }
}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false; 
  loginButtonText : string = "log in"; 
  formModel={
    Email:'',
    Password:''
  }
  constructor(private accountService : AccountService, private router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.isLoading = true;
    this.loginButtonText = "Please wait :)"; 
    this.accountService.login(this.formModel).subscribe(
      (res:any)=>{
        this.isLoading = false;
        this.router.navigateByUrl('/nav');
        this.toastr.error('Incorrect username or password:(', 'Authentication Failed!'); 
      }, 
      err => {
        if(err.status = 400){
          this.toastr.error('Incorrect username or password:(', 'Authentication Failed!'); 
          console.log("Error testing"); 
          this.isLoading = false;
          this.loginButtonText = "Try Again :("; 
        }
          
        else
          console.log(err); 
      }
    );
  }
}

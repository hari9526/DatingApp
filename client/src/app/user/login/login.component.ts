import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false; 
  loginButtonText : string = "log in"; 
  
  constructor(public accountService : AccountService, private router : Router, private toastr: ToastrService, private fb: FormBuilder) { }
  formModel=this.fb.group({
    Email: ['', [Validators.required, Validators.email]], 
    Password: ['', [Validators.required, Validators.minLength(4)]]
  }); 
  ngOnInit(): void {
  }
  onSubmit(){
    this.isLoading = true;
    this.loginButtonText = "Please wait :)"; 
    var body ={
 
      Email : this.formModel.value.Email, 
      Password : this.formModel.value.Password
    }
    this.accountService.login(body).subscribe(
      (res:any)=>{
        this.isLoading = false;
        this.router.navigateByUrl('/members');
        this.toastr.success('', 'Welcome!'); 
      }, 
      err => {
        if(err.status = 400){
          this.isLoading = false;
          this.loginButtonText = "Try Again :("; 
        }
          
        else
          console.log(err); 
      }
    );
  }
}

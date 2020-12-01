import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  signUpButtonText: string = "Sign up";

  constructor(public service: AccountService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }
  onSubmit(){ 
    this.isLoading = true; 
    this.signUpButtonText = "Creating"; 
    this.service.register().subscribe(
      (res: any) =>{
      
          this.isLoading = false;      
          this.signUpButtonText = "Register again?"; 
          this.toastr.success('You have completed the registration', 'Success!');   
        
      }, 
      err=>{
        alert("Fuck");
        console.log(err); 
      }
    ); 

  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    //For root means services that needs to intialized when 
    //root module starts 
    BsDropdownModule.forRoot(), 
    ToastrModule.forRoot({
      progressBar:true, 
      positionClass: 'toast-bottom-right'
    })
  ], 
  exports:[
    BsDropdownModule, 
    ToastrModule
  ]
})
export class SharedModule { }

import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: 'app/user/profile.component.html',
  styles:[`
      em: { float: right; color:#E05C65; padding-left: 10px;}
      .error input {background-color:#E3C3C5;}
      .error ::-webkit-input-placeholder { color: #999; }
      .error ::-moz-placeholder { color: #999; }
      .error :-moz-placeholder { color:#999; }
      .error :ms-input-placeholder { color: #999; }
      em { float: right;color:#E05C65;padding-left:10px; }
  `]
})
export class ProfileComponent implements OnInit {
  
  profileForm:FormGroup;
  
  private firstName: FormControl;
  private lastName: FormControl;


  constructor(private authService:AuthService,
              private router:Router){}

  ngOnInit(): void {

     const currentUser = this.authService.currentUser;

     this.firstName = new FormControl(currentUser.firstName,
      [
        Validators.required,
        Validators.pattern('[a-zA-Z].*')      
      ]);
     this.lastName = new FormControl(currentUser.lastname,Validators.required);

     this.profileForm = new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName
     });
  }

  validateLastName(){
     return this.lastName.valid || this.lastName.touched;
  }

  saveProfile(formValues){

    if (this.profileForm.valid){
      this.authService.updateCurrentUser(formValues.firstName,formValues.lastName);
      this.router.navigate(['events']); 
    }

  }

  cancel(){
     this.router.navigate(['events']);
  }

}
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  templateUrl: 'app/user/profile.component.html'
})
export class ProfileComponent implements OnInit {
  
  profileForm:FormGroup;
  
  constructor(private authService:AuthService,
              private router:Router){}

  ngOnInit(): void {

     const currentUser = this.authService.currentUser;

     let firstName = new FormControl(currentUser.firstName);
     let lastName = new FormControl(currentUser.lastname);

     this.profileForm = new FormGroup({
        firstName: firstName,
        lastName: lastName
     });
  }

  saveProfile(formValues){
    this.authService.updateCurrentUser(formValues.firstName,formValues.lastName);
    this.router.navigate(['events']); 
  }

  cancel(){
     this.router.navigate(['events']);
  }

}
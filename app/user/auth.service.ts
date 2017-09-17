import { IUser } from './user.model';
import { Injectable } from '@angular/core';



@Injectable()
export class AuthService{

    currentUser:IUser;

    loginUser(username: string, password:string){
        this.currentUser = {
            id: 1,
            userName: username,
            firstName: 'John',
            lastname: 'Papa'
        };
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName:string,lastName:string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastname = lastName;
    }

}
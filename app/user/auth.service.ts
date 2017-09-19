import { Observable } from 'rxjs/Observable';
import { IUser } from './user.model';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx';

@Injectable()
export class AuthService{

    currentUser:IUser;

    constructor(private http:Http) {

    }

    loginUser(username: string, password:string){
        
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        const options = new RequestOptions({headers: headers});

        const loginInfo = { username: username, password: password };

        return this.http.post('/api/login', JSON.stringify(loginInfo),options)
                   .do(resp => {

                       if (resp){
                           this.currentUser = resp.json().user;
                       }

                   }).catch(error => {
                       return Observable.of(false);
                   });
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName:string,lastName:string){
        
        this.currentUser.firstName = firstName;
        this.currentUser.lastname = lastName;

        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        const options = new RequestOptions({headers: headers});

        return this.http.put(`/api/users/${this.currentUser.id}`,
                             JSON.stringify(this.currentUser),
                             options);
    }

    checkAuthenticationStatus(){
        
        return this.http.get('/api/currentIdentity')
          .map((response:any) => {
            if (response._body){
                return response.json();
            }else{
                return {};
            }
        }).do(currentUser => {
            if (!!currentUser.userName){
              this.currentUser = currentUser;
            }
        }).subscribe();
    }

    logout(){

        this.currentUser = undefined;

        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        const options = new RequestOptions({headers: headers});        

        return this.http.post('/api/logout',JSON.stringify({}),options);
    }

}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {  ViewChild, ElementRef } from '@angular/core';

import { User } from './user';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

const USERS = [
];

@Injectable()
export class AuthService { 
    private redirectUrl: string = '/';
	private loginUrl: string = '/login';
	private isloggedIn: boolean = false;
	private loggedInUser: User;
    private baseUrl: string = 'https://hotella.herokuapp.com/api';

	constructor(private http : Http){

    }
	getAllUsers(email:string,password:string): Observable<boolean> {

		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		var myObj = { "email":email,"password":password};
		return this.http.post(`${this.baseUrl}/utilizadores/login`, JSON.stringify(myObj),options).map(
			(res:Response) =>{
				var data=res.json()
				if(isNaN(data['message'])){
					if(data['message']==='ADMIN'){
						USERS.push(new User(email,password,'ADMIN'));
						this.isloggedIn = true;
						this.loggedInUser = USERS[0];
						localStorage.setItem('currentUser', JSON.stringify(this.loggedInUser));
					}else{
						USERS.push(new User(email,password,'USER'));
						this.isloggedIn = true;
						this.loggedInUser = USERS[0];
						localStorage.setItem('currentUser', JSON.stringify(this.loggedInUser));
					}
				}else{
					this.isloggedIn=false;
				}
				return this.isloggedIn;

			})
		.catch(handleError);
		
	}

	isUserAuthenticated(username: string, password:string): Observable<boolean> {
		return this.getAllUsers(username,password).map(users => {
					return this.isloggedIn; 	
				}
			);

			
	}	
	
	
	isUserLoggedIn(): boolean {
		if(JSON.parse(localStorage.getItem('currentUser'))){
			return true	
		} 
		else
		return this.isloggedIn;
	}
	getRedirectUrl(): string {
		return this.redirectUrl;
	}
	setRedirectUrl(url: string): void {
		this.redirectUrl = url;
	}
	getLoginUrl(): string {
		return this.loginUrl;
	}
	getLoggedInUser(): User {
		return JSON.parse(localStorage.getItem('currentUser'));
	}
	logoutUser(): void{
		this.isloggedIn = false;
		localStorage.removeItem('currentUser')

	}
}

function handleError (error: any) {
	// log error
	// could be something more sofisticated
	let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
	console.error(errorMsg);
  
	// throw an application level error
	return Observable.throw(errorMsg);
  }
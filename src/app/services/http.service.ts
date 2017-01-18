import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Headers, Response} from '@angular/http';
import { Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment} from "../../environments/environment";
import {NgUploaderOptions} from "ngx-uploader";

@Injectable()
export class HttpService {

	constructor(private http:Http) {

	}

	public login(email:string, password:string):Observable<Response>{
	  console.log('service login start');
	  var body = JSON.stringify({
	    'email':email,
	    'password':password
	  });
	  return this.makePost(environment.loginUrl,body);

	}

	public register(name:string, email:string,
	                password:string, type:number):Observable<Response>{

	  console.log('service register start');
	  var body = JSON.stringify({
	    'nickName':name,
	    'email':email,
	    'password':password,
	    'userType':type
	  });

	  return this.makePost(environment.registerUrl,body);

	}



	public testReadOneUser(){
	  this.makeGetWithToken("http://localhost:3000/api/user/58425fba6ce2b75c64747aca")
	      .subscribe((resp)=>{
	        console.log(resp.json());
	      });
	}


	private makeGetWithToken(url:string):Observable<Response>{
	  var header = new Headers();
	  header.append('Authorization',"Bearer " + this.getToken());
	  return this.http.get(url,{headers:header});
	}

	private makePost(url:string, body:any):Observable<Response>{
	  var header = new Headers();
	  header.append('Content-Type', 'application/json');
	  return this.http.post(url,body,
	      {headers:header});
	}

	private makePostWithToken(url:string, body:any):Observable<Response>{
		  var header = new Headers();
		  header.append('Content-Type', 'application/json');
		  header.append('Authorization', 'Bearer ' + this.getToken());
		  return this.http.post(url,body,{headers:header});
	}



	public getToken():string{
	  return localStorage.getItem("auth_token");
	}

	public setToken(token:string){
	  localStorage.setItem("auth_token",token);
	}

	public deleteToken(){
	  localStorage.removeItem("auth_token");
	}

	public isLoggedIn():boolean{
		return this.getToken()? true:false;
	}

	public logout(){
		this.deleteToken();

	}

}

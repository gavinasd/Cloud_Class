import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Headers, Response} from '@angular/http';
import { Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment} from "../../environments/environment";

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
                  password:string, type:string):Observable<Response>{

    console.log('service register start');
    var body = JSON.stringify({
      'name':name,
      'email':email,
      'password':password,
      'type':type
    });

    return this.makePost(environment.registerUrl,body);

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

  private makePost(url:string, body:any):Observable<Response>{
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post(url,body,
        {headers:header});
  }

}

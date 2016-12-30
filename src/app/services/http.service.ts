import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers} from '@angular/http';
import { Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { environment} from "../../environments/environment";

@Injectable()
export class HttpService {

  constructor(private http:Http) {

  }

  public login(email:string, password:string){
    console.log('service login start');
    var body = JSON.stringify({
      'email':email,
      'password':password
    });
    this.makePost(environment.loginUrl,body)
      .subscribe(resp=>{
        console.log(resp.json());
      });

  }

  public register(name:string, email:string,
                  password:string, type:string){
    console.log('service register start');
    var body = JSON.stringify({
      'name':name,
      'email':email,
      'password':password,
      'type':type
    });
    this.makePost(environment.registerUrl,body)
      .subscribe(resp=>{
        console.log(resp.json())
      });
  }

  private makePost(url:string, body:any){
    var header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.post(url,body,
        {headers:header});
  }

}

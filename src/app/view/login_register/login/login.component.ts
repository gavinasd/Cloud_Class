import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService:HttpService, private router:Router) { }

  ngOnInit() {
  }


  onSubmit(form:any):boolean{
    this.httpService.login(form.email,form.password)
        .subscribe((resp)=>{
            this.httpService.setToken(resp.json().token);
            this.router.navigate(['']);
        });
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpService:HttpService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:any):boolean{
    this.httpService.register(form.name,form.email,form.password,form.type)
        .subscribe((resp)=>{
          this.httpService.setToken(resp.json().token);
          this.router.navigate(['']);
        });
    return false;
  }

}

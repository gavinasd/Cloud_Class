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
    var type = 0;
    if(form.type == "teacher"){
        type = 1;
    }

    this.httpService.register(form.name,form.email,form.password,type)
        .subscribe((resp)=>{
            console.log(resp.json());
            this.httpService.setToken(resp.json().token);
            this.router.navigate(['']);
        });
    return false;
  }

}

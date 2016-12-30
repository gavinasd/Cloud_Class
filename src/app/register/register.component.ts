import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  ngOnInit() {
  }

  onSubmit(form:any):boolean{
    this.httpService.register(form.name,form.email,form.password,form.type);
    return false;
  }
}

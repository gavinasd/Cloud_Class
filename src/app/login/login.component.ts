import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms";
import { HttpService} from "../services/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  ngOnInit() {
  }


  onSubmit(form:any):boolean{
    this.httpService.login(form.email,form.password);
    return false;
  }
}

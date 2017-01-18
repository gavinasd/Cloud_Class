import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Route} from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { LoginComponent } from './view/login_register/login/login.component';
import { RegisterComponent } from './view/login_register/register/register.component';

import { HttpService } from './services/http.service';
import { LoginRegisterComponent } from './view/login_register/login-register/login-register.component';
import { IndexComponent } from './view/course/index/index.component';
import { CourseListComponent } from './view/course/course-list/course-list.component';
import { CourseListItemComponent } from './view/course/course-list-item/course-list-item.component';

const routes:Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'login_register',component:LoginRegisterComponent},
  {path:'index',component:IndexComponent}
];

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      LoginRegisterComponent,
      IndexComponent,
      CourseListComponent,
      CourseListItemComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      NgUploaderModule,
      RouterModule.forRoot(routes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

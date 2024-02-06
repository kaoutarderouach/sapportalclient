import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EP1Service } from 'src/app/services/ep1.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UrlConnectionService } from 'src/app/services/url-connection.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string ="";
  empthyError:boolean=false;
  errorMessage: string ='';
  loginError: boolean = false;
  resultJobs:any[] =[];
  jobs:any[] =[];
  logo = 'assets/images/login.png'
  userLogged:string=''
  user:User={username:"",name:"",password:""}
  constructor(private http: HttpClient, private ep1service: EP1Service,private authService: AuthService,private router: Router, private urlConnectionervice:UrlConnectionService,private readonly translocoService: TranslocoService){ }
   urlAdmin=this.urlConnectionervice.getAdminUrl()
  ngOnInit(): void {
  //this.ep1service.login()

  console.log("connected");
}

onSubmit() {
  this.http.post<{user:User }>(this.urlAdmin+'api/login', { username: this.username, password: this.password }).subscribe(
    response => {
      this.user = response.user;
      console.log('Login successful');
      this.userLogged=this.username


      this.sendMessage()


      this.loginError = false;
      this.authService.login();
      // redirect to home page or dashboard
      this.router.navigate(['/dashboard']);
    },
    error => {
      console.log(error);
    }

  );

}
@Output() event = new EventEmitter<User>()

sendMessage(){
  this.event.emit(this.user)

}

}

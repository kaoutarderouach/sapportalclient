import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConnectionService } from 'src/app/services/url-connection.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  name: string ="";
  username: string ="";
  password: string ="";
  role=0;

  constructor(private http:HttpClient, private urlConnectionervice:UrlConnectionService ){}
  urlAdmin=this.urlConnectionervice.getAdminUrl()

  onSubmit(){
    //this.http.post('http://localhost:3000/api/register', {
      this.http.post(this.urlAdmin+'api/register', {
      name: this.name,
      username: this.username,
      password: this.password,
      role:this.role,
    }).subscribe((data) => {
      console.log(data);



    });



  }
}

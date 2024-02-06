import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { interval } from 'rxjs';
import { UrlConnectionService } from 'src/app/services/url-connection.service';
import { TranslocoService } from '@ngneat/transloco';




@Component({
  selector: 'app-user-list',

  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[]=[];
  password: string="";
 // id:number=0;
  selectedUser: User={id:0,username:"",name:"",password:"",role:0}
  updateSubscription: any;
  role=0

  constructor(private http: HttpClient, private userService:UserService, private urlConnectionervice:UrlConnectionService, private readonly translocoService: TranslocoService) {}
  urlAdmin=this.urlConnectionervice.getAdminUrl()

  ngOnInit() {
    this.getUsersList()

    // Make an HTTP GET request to the API endpoint
    this.updateSubscription = interval(3000).subscribe((val)=>{
      this.getUsersList()

  })}
  getUsersList(){
    this.http.get<any[]>(this.urlAdmin+'api/users').subscribe(
      // Handle the successful response
      data => {
        this.users = data;
      },
      // Handle errors
      error => {
        console.error(error);
      }
    );
  }
    onSubmit() {
      this.userService.updateUser(this.selectedUser)
      .subscribe(() => {
          alert(this.selectedUser.name);

        }, error => {
          console.error(error);
          alert("user updated succesfully");
        });
    }
    deleteUser(id:number){
      this.userService.deleteUser(id)
      .subscribe(() => {
        alert('User deleted successfully');

      });
    }
    activeUser(id:number){
      this.userService.activeUser(id)
      .subscribe(() => {
        alert('User actived successfully');

      });
    }
    editUser(user: User) {
      this.selectedUser = user;

    }
}

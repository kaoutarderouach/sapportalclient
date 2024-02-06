import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { UrlConnectionService } from 'src/app/services/url-connection.service';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  oldPassword:any;
  confirmPassword:any="";
  selectedUser: User={id:0,username:"",name:"",password:""}
  id:any
  updateSubscription: any;
  users: any[] =[]
  showModal:boolean=true
  submitForm() {
    // your form submission logic here
    this.showModal = false;
    this.cdr.detectChanges();
  }
  ngOnInit(): void {


    this.id = this.route.snapshot.paramMap.get('id');
    this.getProfile()
    // Make an HTTP GET request to the API endpoint
    this.updateSubscription = interval(3000).subscribe((val)=>{
      this.getProfile()

  })


  }
  constructor(private userService:UserService, private route:ActivatedRoute,private http: HttpClient,private cdr: ChangeDetectorRef, private urlConnectionService: UrlConnectionService, private readonly translocoService: TranslocoService){}
urlAdmin= this.urlConnectionService.getAdminUrl()
  onClick(){
  this.selectedUser=this.users[0]
  console.log(this.selectedUser)
  this.selectedUser.password=""

}
  getProfile(){
    this.http.get<any[]>(this.urlAdmin+'api/user/'+this.id).subscribe(
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


    this.userService.updateProfile(this.selectedUser,this.oldPassword)
    .subscribe(() => {
        alert(this.selectedUser.name);

      }, error => {
        console.error(error);
        alert("user updated succesfully");

      });
  }

}

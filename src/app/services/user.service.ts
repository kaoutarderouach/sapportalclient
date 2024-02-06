import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UrlConnectionService } from './url-connection.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 apiUrl="http://35.153.10.159:3000/api/users"
  apiUserUrl="http://35.153.10.159:3000/user"
  apiUrlArchive="http://35.153.10.159:3000/user/archive/"
  apiUrlActive="http://35.153.10.159:3000/user/active/"
  constructor(private http: HttpClient, private urlConnectionService: UrlConnectionService) {}
  //apiUrl = this.urlConnectionService.getAdminUrl()+'/users'
  getUsers(): Observable<any> {

    return this.http.get(this.apiUrl);
  }
  getUser(id:any): Observable<any> {
    const url = `${this.apiUserUrl}/${id}`;
    return this.http.get(url);
  }


  updateUser(user:User) {
    const url = `${this.apiUrl}/${user.id}`;
    const body = {password:user.password,username:user.username,name:user.name,role:user.role};
    return this.http.put(url, body);
  }
  updateProfile(user:User,oldPasswordChanged:any){
    const userUrl = `${this.apiUserUrl}/${user.id}`;
    const body = {password:user.password,username:user.username,name:user.name,oldPassword:oldPasswordChanged};
    return this.http.put(userUrl, body);
  }
  deleteUser(userId: number): Observable<any> {
    console.log(this.apiUrl+'/'+userId)
    const body = {username:""};
    return this.http.put(this.apiUrlArchive+userId, body);

  }
  activeUser(userId: number): Observable<any> {
    console.log(this.apiUrl+'/'+userId)
    const body = {username:""};
    return this.http.put(this.apiUrlActive+userId, body);

  }
}

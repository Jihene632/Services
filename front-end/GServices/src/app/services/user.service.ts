import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppSettings } from '../settings/app.settings';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
user:User;
  constructor(private http:HttpClient) { }

Login(login :string ,password:string){
  return this.http.post<User>(AppSettings.APP_URL+"/users/login?login="+ login +"&password="+ password,null);
}

getUtilisateurs(){
  return this.http.get<User[]>(AppSettings.APP_URL+"/users/");
}
 addUser(donn:FormData){
   return this.http.post<User>(AppSettings.APP_URL+"/users/",donn);
 }
editUser(idUser:String,donn:FormData)
{
  return this.http.put(AppSettings.APP_URL+"/users/edit/"+idUser,donn)
  
 
}
getuserbyid(id:number){
  return this.http.get<User>(AppSettings.APP_URL+"/users/"+id);
}

removeuser(id:number)
{
  return this.http.delete<User>(AppSettings.APP_URL+"/users/delete/"+id);
}
}
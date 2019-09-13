import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personnel } from '../models/personnel';
import { AppSettings } from '../settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private http:HttpClient) { }
getAllPersonnels (){
  return this.http.get<Personnel[]>(AppSettings.APP_URL+"/personnels/");
}
addPersonnel(p:Personnel){
  return this.http.post<Personnel>(AppSettings.APP_URL+"/personnels/",p);
}

getPersonnelById(id:number){
  return this.http.get<Personnel>(AppSettings.APP_URL+"/personnels/"+id);
}

updatePerso(perso:Personnel,id:number){
  return this.http.put<Personnel>(AppSettings.APP_URL+"/personnels/edit/"+id,perso);
}

deleteP(id:number){
  return this.http.delete<Personnel>(AppSettings.APP_URL+"/personnels/delete/"+id);
}
  }

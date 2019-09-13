import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conges } from '../models/conges';
import { AppSettings } from '../settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  constructor(private http:HttpClient) { }

addConges(conges:Conges){
return this.http.post<Conges>(AppSettings.APP_URL+"/Conges/",conges);
}
getConges(id:number){
  return  this.http.get<Conges>(AppSettings.APP_URL+"/Conges/"+id);
}
getCongesById(id:number){
  return this.http.get<Conges>(AppSettings.APP_URL+"/Conges/"+id);
}
getAllCongesofPersonnel(id:number){
  return this.http.get<Conges[]>(AppSettings.APP_URL+"/Conges/all/"+id);
}

removeConges(id:number){
  return this.http.delete<Conges>(AppSettings.APP_URL+"/Conges/delete/"+id);
}
editConges(con:Conges,id:number){
  return this.http.put<Conges>(AppSettings.APP_URL+"/Conges/edit/"+id,con);
}
deleteConges(id:number){
  return this.http.delete<Conges>(AppSettings.APP_URL+"/Conges/delete/"+id);
}

}

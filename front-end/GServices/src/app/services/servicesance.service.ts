import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ServicesanceService {

  constructor(private http:HttpClient) { }
    getSignatureTest(){
      return this.http.get<String>(AppSettings.APP_URL+"/services/signatureTest");
    }
    getValidationClient(){
      return this.http.get<any>(AppSettings.APP_URL+"/services/TestValidation")
    }
    getAuth(){
      return this.http.get<String>(AppSettings.APP_URL+"/services/Auth");
    }
    
  }

import { Component, OnInit, ɵConsole } from '@angular/core';
import { ServicesanceService } from 'src/app/services/servicesance.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nvMessage1:string;
  message1:String;
  nvMessage:string;
  message:String;
  nvMessage2:string;
  message2:String;
  errorMessage:string;
  successMessage:string;
  errorMessage1:string;
  successMessage1:string;
  errorMessage2:string;
  successMessage2:string;
  user:User;
 
    constructor(private serviceA:ServicesanceService,private router:Router) {this.checkUser(); }
    checkUser() {
      if (localStorage.getItem('currentUser') === undefined || localStorage.getItem('currentUser') === null) {
        console.log("user is invalid, redirection");
        this.router.navigate(['/login']);
        return;
      }
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      
    }
  
  logout(){
      localStorage.removeItem('currentUser');
     console.log( localStorage.getItem('currentUser'));

      this.router.navigate(['/login']);
  } 
  
    ngOnInit() {
     setInterval(() => { this.Afficher(); }, 1000);
     
    }
 
    Afficher(){
      this.serviceA.getSignatureTest()

      .subscribe(data => {
       
    
    },error=>
  
    {
      if(error.status === 400) {
        
        this.errorMessage = "Connection failed";
        this.successMessage="";
        this.message=error.error;
        this.nvMessage=this.message.substr(39,this.message.length)
      }
      
      if(error.status === 200) {
       this.successMessage="Connection success";
       this.errorMessage="";
       this.errorMessage = "Connection failed";
        this.successMessage="";
        this.message=error.error;
        this.nvMessage=this.message.substr(2,this.message.length)
        
      }
      });
      
      this.serviceA.getValidationClient()
      .subscribe(data => {
        console.log(data);
        
        
    
      },error=>
      {
       

        if(error.status === 400) {
          this.message1=error.error.text;
          this.nvMessage1=this.message1.substr(19,this.message1.length)
          this.errorMessage1 = "Connection failed";
          this.successMessage1="";
        }

       
        if(error.status === 200) {
         
         this.message1=error.error.text;
         this.nvMessage1=this.message1.substr(54,this.message1.length)

         this.successMessage1="Connection success";
        
         this.errorMessage1="";
          
        }
        });
        this.serviceA.getAuth()
       
      .subscribe(data => {
       
    
    },error=>
    {
     
      if(error.status === 400) {
       
        this.errorMessage2 = "Connection failed";
        this.successMessage2="";
        this.message2=error.error;
        this.nvMessage2=this.message2.substr(47,this.message2.length)
      }
      
      if(error.status === 200) {
       this.successMessage2="Connection success";
       this.errorMessage2="";
       this.message2=error.error;
       this.nvMessage2=this.message2.substr(2,this.message2.length)
        
      }
      })
  }
   

 
    }
  
  
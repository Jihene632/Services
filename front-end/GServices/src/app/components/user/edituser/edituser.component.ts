import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
user:User;
edit:FormGroup;
photo:File;
use:number;

  constructor(private service:UserService,private formbuilder:FormBuilder,private router:Router) {
    this.edit=this.formbuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      date_naissance: ['', [Validators.required]],
      role: ['', [Validators.required]],
     
      login: ['', [Validators.required],Validators.email],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      photo:[]
    });
     
     
    

    
 
}
nomP:string;
prenom:string;
date_naissance:string;
role:string;
login:string;
password:string;
gender:string;
selectFile(event)
  {
     let reader=new FileReader();
     if(event.target.files && event.target.files.length>0)
     {
        this.photo=event.target.files[0];
        console.log(this.photo);
     }
  }

  ngOnInit() {
    this.actualiser();
   
  }
 
  actualiser(){
  
    let use= localStorage.getItem('user');
    this.service.getuserbyid(+use)
    .subscribe(data=>{
      this.user=data
    },error=>
    {
      if(error.status === 404) {
        alert("An error occured while updating this user");
      }
      
      
      });
  }
 
 Modifier(){
  let id=localStorage.getItem('user');
  
  const donn:FormData=new FormData();
  donn.append('photo',this.photo);
  donn.append("user",new Blob([JSON.stringify(new User(this.nomP,this.prenom,this.date_naissance,this.role,this.login,this.password,this.gender))], {
       type: "application/json"
  })
);
  this.service.editUser(id,donn)
    .subscribe(
      data=>{
      this.router.navigate(['/listeuser']);
    })
 }

}

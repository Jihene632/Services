import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  add:FormGroup; 
 errorMessage:string;
 photo:File;
 user:User;

  constructor(private service:UserService,private router:Router,private formbuilder:FormBuilder) { 
  this.add=this.formbuilder.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    date_naissance: ['', [Validators.required]],
    role: ['', [Validators.required]],
   
    login: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    gender: ['', [Validators.required]],
    photo:[]
  });

  }

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
    
     this.errorMessage='';

    }

    
ajoutuser(){
  const nom=this.add.get('nom').value;
  const prenom=this.add.get('prenom').value;
  const date_naissance=this.add.get('date_naissance').value;
  const role=this.add.get('role').value;
  const login=this.add.get('login').value;
  const password=this.add.get('password').value;
  const gender=this.add.get('gender').value;
  const donn:FormData=new FormData();
  donn.append('photo',this.photo);
  donn.append("user",new Blob([JSON.stringify(new User(nom,prenom,date_naissance,role,login,password,gender))], {
       type: "application/json"
  })
);
 this.service.addUser(donn)
.subscribe(data=>{
  this.router.navigate(["/listeuser"]);
  
})

}
}
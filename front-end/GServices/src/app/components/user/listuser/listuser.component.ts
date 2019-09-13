import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
users:User[];
errorMessage:string;
  constructor(private userService:UserService,private router:Router) { 
   
  }

  ngOnInit() {
    this.findUsers();
    
  }
findUsers(){
  this.userService.getUtilisateurs()
  .subscribe(data=>{
    this.users=data;
  })
}
edit(user:User){ 
  if(user.idUser === undefined) { 
   this.errorMessage="An error occured while updatinng the character";
  return;
  }
localStorage.setItem("user",user.idUser.toString());
this.router.navigate(["/edituser"]);

}
remove(idUser: number) {
  if(idUser === undefined) {
    this.errorMessage="An error occured while removing the character";
    return;
  }
  if (confirm("Do you really want to delete this user?")) {
    
    this.userService.removeuser(idUser)
      .subscribe(data => {
  
    },error=>
    {
      if(error.status === 404) {
        this.errorMessage = "An error occured while removing this user";
      }
      
      if(error.status === 200) {
        confirm("user successfully removed");
        this.findUsers();
        
        
      }
      });
  }
 
}

filter(keyWord: string) {
  if (keyWord === undefined || keyWord.length === 0) {
    this.findUsers();
    return;
  }
  
  this.users = this.users.filter(user=> 
   user.date_naissance .toLowerCase().includes(keyWord) || user.nom.toLowerCase().includes(keyWord) || 
   user.prenom.toLowerCase().includes(keyWord)  || user.role.toLowerCase().includes(keyWord) 
  );
}

}


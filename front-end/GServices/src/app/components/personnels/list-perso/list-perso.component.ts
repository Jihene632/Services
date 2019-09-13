import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Personnel } from 'src/app/models/personnel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-perso',
  templateUrl: './list-perso.component.html',
  styleUrls: ['./list-perso.component.css']
})

export class ListPersoComponent implements OnInit {
personnels:Personnel[];
errorMessage:string;
  constructor(private persoService:PersonnelService,private router:Router) { }
  ngOnInit() {
    this.findAllPersonnels();
  }
  findAllPersonnels(){
    this.persoService.getAllPersonnels()
    .subscribe(data=>{
      this.personnels=data;
    })
  }



  removeP(perso:Personnel) {
    if(perso.idPersonnel === undefined) {
      this.errorMessage="An error occured while removing the personnel";
      return;
    }
    if (confirm("Do you really want to delete this personnel")) {
      this.persoService.deleteP(perso.idPersonnel)
       
        .subscribe(data => {
         
      
      },error=>
      {
        if(error.status === 404) {
          this.errorMessage = "An error occured while removing this personnel";
        }
        
        if(error.status === 200) {
          confirm("personnel successfully removed");
          this.findAllPersonnels();
          
        }
        });
    }
   
  }

  edit(perso:Personnel):void {
    if(perso.idPersonnel === undefined) {
     this.errorMessage="An error occured while updatinng the personnel";
    return;
    }
    
  localStorage.setItem("persoId",perso.idPersonnel.toString());
  
  this.router.navigate(["/modifPersonnel"]);
  
  }
  

  filter(keyWord: string) {
    if (keyWord === undefined || keyWord.length === 0) {
      this.findAllPersonnels();
      return;
    }
    this.personnels = this.personnels.filter(perso=> 
     perso.nom .toLowerCase().includes(keyWord) || perso.prenom.toLowerCase().includes(keyWord) || 
     perso.matricule.toLowerCase().includes(keyWord)  || perso.cin.toLowerCase().includes(keyWord) 
    );
  }
  
 addconges(perso:Personnel):void{
   localStorage.setItem("perso",JSON.stringify(perso));
   this.router.navigate(["/ajoutConges"]);
 }


}
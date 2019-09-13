import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Router } from '@angular/router';
import { Personnel } from 'src/app/models/personnel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-perso',
  templateUrl: './edit-perso.component.html',
  styleUrls: ['./edit-perso.component.css']
})
export class EditPersoComponent implements OnInit {
editP:FormGroup;
 p:Personnel=new Personnel();
 per:Personnel=new Personnel();
 

 
 
  constructor(private service:PersonnelService,private router:Router,private form:FormBuilder) {
    
    this.editP=this.form.group({
      nom: ["", [Validators.required]],
      prenom: ['', [Validators.required]],
      date_embauche: ['', [Validators.required]],
      date_naissance: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      type_contrat: ['', [Validators.required]],
      tel1: ['', [Validators.required]],
      tel2: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      matricule: ['', [Validators.required]],
      poste_occupe: ['', [Validators.required]]
  
  
  
  })
  
    }
   

  ngOnInit() {
    this.Actualiser();
  }
  Actualiser(){
    let persoId=localStorage.getItem("persoId");
   
    this.service.getPersonnelById(+persoId)
    .subscribe(data=>{
      this.p=data;
      
      //console.log(this.p);
      var datePipe = new DatePipe("en-US");
  
  let formatedyear = datePipe.transform(this.p.date_embauche, 'yyyy-MM-dd');
  let formatedyear1 = datePipe.transform(this.p.date_naissance, 'yyyy-MM-dd');
  
  
  this.p.date_embauche = formatedyear;
  this.p.date_naissance = formatedyear1;

    
    })

  }

  ModifPerso(){
    this.service.updatePerso(this.p,this.p.idPersonnel)
    .subscribe(data=>{
      this.p=data;
      //console.log(this.p);
      this.router.navigate(["/listePersonnels"]);
    })
     
  }
}

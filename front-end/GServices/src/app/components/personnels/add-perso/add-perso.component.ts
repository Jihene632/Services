import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personnel } from 'src/app/models/personnel';

@Component({
  selector: 'app-add-perso',
  templateUrl: './add-perso.component.html',
  styleUrls: ['./add-perso.component.css']
})
export class AddPersoComponent implements OnInit {
addP:FormGroup
  constructor(private service:PersonnelService,private router:Router,private form:FormBuilder) { 
this.addP=this.form.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    date_embauche: ['', [Validators.required]],
    date_naissance: ['', [Validators.required]],
    cin: ['', [Validators.required,Validators.maxLength(8)&&Validators.minLength(8),Validators.pattern('[0-9]*')]],//max length=8 et min length=8 dc length=8 wykoun cin metkawn mn chiffres akhaw
    type_contrat: ['', [Validators.required]],
    tel1: ['', [Validators.required]],
    tel2: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    matricule: ['', [Validators.required]],
    poste_occupe: ['', [Validators.required]]



})


  }

  ngOnInit() {
  }
ajoutPerso(){
  //autre méthode1:
  /*const nom=this.addP.get('nom').value;
  const prenom=this.addP.get('prenom').value;
  const date_embauche=this.addP.get('date_embauche').value;
  const date_naissance=this.addP.get('date_naissance').value;
  const cin=this.addP.get('cin').value;
  const type_contrat=this.addP.get('type_contrat').value;
  const tel1=this.addP.get('tel1').value;
  const tel2=this.addP.get('tel2').value;
  const adresse=this.addP.get('adresse').value;
  const matricule=this.addP.get('matricule').value;
  const poste_occupe=this.addP.get('poste_occupe').value;
 
  const p= new Personnel(nom,prenom,date_embauche,date_naissance,cin,type_contrat,tel1,tel2,adresse,matricule,poste_occupe);*/

  const p =this.addP.value;
this.service.addPersonnel(p)
.subscribe(data=>{
  this.router.navigate(["/listePersonnels"]);

})
}
}
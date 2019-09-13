import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CongesService } from 'src/app/services/conges.service';
import { Personnel } from 'src/app/models/personnel';
import { Conges } from 'src/app/models/conges';
import { PersonnelService } from 'src/app/services/personnel.service';

@Component({
  selector: 'app-add-conges',
  templateUrl: './add-conges.component.html',
  styleUrls: ['./add-conges.component.css']
})
export class AddCongesComponent implements OnInit {
addC:FormGroup;
p:Personnel=new Personnel();
  constructor(private form:FormBuilder,private route:Router,private service:CongesService,private serviceP:PersonnelService) {
    this.addC=this.form.group({
      dureeD: ['', [Validators.required]],
      dureeF: ['', [Validators.required]],
      raisons: ['', [Validators.required]]
     
    });
     
  
  
  
    }
   

  ngOnInit() {
  }
  /*getPersonnel(){
    let id =localStorage.getItem("per");
    this.serviceP.getPersonnelById(+id)
    .subscribe(data=>{
      this.p=data;
    })

  }*/
 ajoutConges(){

   const dureeD=this.addC.get("dureeD").value;
   
   const dureeF=this.addC.get("dureeF").value;
   const raisons=this.addC.get("raisons").value;
   this.p = JSON.parse(localStorage.getItem('perso'));
   localStorage.setItem("idPer",((this.p).idPersonnel).toString());
   const c=new Conges(dureeD,dureeF,raisons,this.p);
   this.service.addConges(c)
   
   .subscribe(data=>{
  this.route.navigate(["/listeCongesParPersonnel"])
   })

   
      

   
 }
}

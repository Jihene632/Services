import { Component, OnInit } from '@angular/core';
import { Conges } from 'src/app/models/conges';
import { CongesService } from 'src/app/services/conges.service';
import { Personnel } from 'src/app/models/personnel';
import { Router, DefaultUrlSerializer } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-liste-conges-par-personnel',
  templateUrl: './liste-conges-par-personnel.component.html',
  styleUrls: ['./liste-conges-par-personnel.component.css']
})
export class ListeCongesParPersonnelComponent implements OnInit {
listeConges:Conges[];

errorMessage:string;
successMessage:string;

  constructor(private service:CongesService,private router:Router) { }

  ngOnInit() {
    this.listeCongesParPersonnel();
  }
listeCongesParPersonnel(){
const idPer=localStorage.getItem('idPer');
this.service.getAllCongesofPersonnel(+idPer)

.subscribe(data=>{
  
  this.listeConges=data;
  
})
}
edit(conges:Conges):void {
  if(conges.idConges === undefined) {
   this.errorMessage="An error occured while updatinng the personnel";
  return;
  }
  
localStorage.setItem("CongesId",conges.idConges.toString());

this.router.navigate(["/modifConges"]);

}

removeC(conges:Conges) {
  if(conges.idConges === undefined) {
    this.errorMessage="An error occured while removing the conges";
    return;
  }
  if (confirm("Do you really want to delete this Conges")) {
    this.service.deleteConges(conges.idConges)
     
      .subscribe(data => {
       
    
    },error=>
    {
      if(error.status === 404) {
        this.errorMessage = "An error occured while removing this Conges";
      }
      
      if(error.status === 200) {
        confirm("Conges successfully removed");
        this.listeCongesParPersonnel();
        
      }
      });
  }
 
}


}

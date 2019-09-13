import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CongesService } from 'src/app/services/conges.service';
import { Conges } from 'src/app/models/conges';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-conges',
  templateUrl: './edit-conges.component.html',
  styleUrls: ['./edit-conges.component.css']
})
export class EditCongesComponent implements OnInit {
editC:FormGroup;
con:Conges=new Conges('','','',null);
  constructor(private form:FormBuilder,private router:Router,private service:CongesService) { 
    this.editC=this.form.group({
      dureeD: ['', [Validators.required]],
      dureeF: ['', [Validators.required]],
      raisons: ['', [Validators.required]]
     
    });
  }

  ngOnInit() {
    this.Actualiser();
  }
  Actualiser(){
    let CongesId=localStorage.getItem("CongesId");
    this.service.getCongesById(+CongesId)
    .subscribe(data=>{
      
       this.con=data;
       //console.log(this.con)
       var datePipe = new DatePipe("en-US");
  
       let formatedyear = datePipe.transform(this.con.dureeD, 'yyyy-MM-dd');
       let formatedyear1 = datePipe.transform(this.con.dureeF, 'yyyy-MM-dd');
       
       
       this.con.dureeD = formatedyear;
       this.con.dureeF = formatedyear1;
    })

  }
ModifConges(){
  this.service.editConges(this.con,this.con.idConges)
    .subscribe(data=>{
      
      this.con=data;
      
      this.router.navigate(["/listeCongesParPersonnel"]);
})
}

}
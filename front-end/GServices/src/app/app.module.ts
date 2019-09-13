import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule,Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import{HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';

import { ListuserComponent } from './components/user/listuser/listuser.component';
import { EdituserComponent } from './components/user/edituser/edituser.component';
import { AdduserComponent } from './components/user/adduser/adduser.component';
import { TestsignComponent } from './components/testsign/testsign.component';
import { PersonnelService } from './services/personnel.service';


import { AddPersoComponent } from './components/personnels/add-perso/add-perso.component';
import { ListPersoComponent } from './components/personnels/list-perso/list-perso.component';
import { EditPersoComponent } from './components/personnels/edit-perso/edit-perso.component';

import { AddCongesComponent } from './components/conges/add-conges/add-conges.component';

import{CongesService} from './services/conges.service';
import { ListeCongesParPersonnelComponent } from './components/conges/liste-conges-par-personnel/liste-conges-par-personnel.component';
import { EditCongesComponent } from './components/conges/edit-conges/edit-conges.component';

import { AuthGuardService } from './services/auth-guard.service';
import { FourOhfourComponent } from './components/four-ohfour/four-ohfour.component';

const routes:Routes =[
{path:"login",component:LoginComponent},
{path:"home",canActivate:[AuthGuardService],component:HomeComponent},

{path:"listeuser",canActivate:[AuthGuardService],component:ListuserComponent},
{path:"edituser",canActivate:[AuthGuardService],component:EdituserComponent},
{path:"ajoutuser",canActivate:[AuthGuardService],component:AdduserComponent},
{path:"listePersonnels",canActivate:[AuthGuardService],component:ListPersoComponent},
{path:"ajoutPersonnel",canActivate:[AuthGuardService],component:AddPersoComponent},
{path:"modifPersonnel",canActivate:[AuthGuardService],component:EditPersoComponent},
{path:"ajoutConges",canActivate:[AuthGuardService],component:AddCongesComponent},
{path:"listeCongesParPersonnel",canActivate:[AuthGuardService],component:ListeCongesParPersonnelComponent},
{path:"modifConges",canActivate:[AuthGuardService],component:EditCongesComponent},

{path:"not-found",component:FourOhfourComponent},
{path:"**",redirectTo:"not-found"}




];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    
    EdituserComponent,
    ListuserComponent,
    AdduserComponent,
    TestsignComponent,
   
    AddPersoComponent,
    ListPersoComponent,
    EditPersoComponent,
  
    AddCongesComponent,
  
    ListeCongesParPersonnelComponent,
  
    EditCongesComponent,
  
    
  
    FourOhfourComponent
   
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  
   
    
  ],
  providers: [UserService,PersonnelService,CongesService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

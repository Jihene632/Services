import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 private loginForm:FormGroup;
errorMessage="";
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router) { 
this.loginForm=formBuilder.group({
  login : ['',Validators.required],
  password : ['',Validators.required]



});

  }

loginUser(){
this.errorMessage='';
if (this.loginForm.invalid) {
  this.errorMessage = "Champs obligatoires";
  return;

}
this.userService.Login(this.login.value,this.password.value)
.pipe ()
.subscribe(data=>{
  console.log(data)
  localStorage.setItem('currentUser',JSON.stringify(data));
 
  this.router.navigate(['/home']);

},error=>
{
  if(error.status === 404) {
    this.errorMessage = "No user was found with the following Email/Password";
  }


});}

  get login (){
    return this.loginForm.get('login');
  }
  get password(){
    return this.loginForm.get('password');
  }


  ngOnInit() {
  }

}

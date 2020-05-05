import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted:boolean=false;
  loginForm:FormGroup;
  check:number;
  
  constructor(private service:LoanService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {

    this.loginForm=this.formBuilder.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]]});
  }

  login(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
  }
  else{
    this.service.validateLogin(this.loginForm.value.userName,this.loginForm.value.password).subscribe(  
      response=>{
        console.log(response)
        return this.handleresponse(response);
      },
      error=>this.handleerror(error));
  }
  
}

handleresponse(response){
  this.check=response;
  if(this.check==1)
  {
    localStorage.userName=this.loginForm.value.userName;
    sessionStorage.userName=this.loginForm.value.userName;
    sessionStorage.password=this.loginForm.value.password;
    this.router.navigate(["/loanModules"]);
  }
  
}
handleerror(error){
  alert(error.error.errorMessage);
  ;
}

signUp(){
  this.router.navigate(["/signUp"]);
  }
  home()
{
  this.router.navigate(["/home"]);
}
}

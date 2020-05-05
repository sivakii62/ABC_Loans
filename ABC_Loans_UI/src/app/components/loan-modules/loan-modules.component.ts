import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan-service.service';
import { LoanAccount } from 'src/app/model/LoanAccount';
import { Account } from 'src/app/model/Account';

@Component({
  selector: 'app-loan-modules',
  templateUrl: './loan-modules.component.html',
  styleUrls: ['./loan-modules.component.css']
})
export class LoanModulesComponent implements OnInit {

  loan:boolean;
  acc?:Account;
  constructor(private router:Router,private service:LoanService) {}

  ngOnInit() {
    
  }
  

  // handleresponse(response){
  //   this.acc=response;
  //   if(this.acc.lacc.loanAmt==0){
  //     this.loan=true;
  //   }
  //   else{
  //     this.loan=false;
  //   }
  // }
  // handleerror(error){
  //   this.acc=error.error.message;
  // }

  loanEligibility(){
    this.service.getAcc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        this.acc=response;
        if(this.acc.lacc.loanAmt==0){
          this.router.navigate(["/loanModules/applyLoan"]);
        }
        else{
          this.router.navigate(["/loanModules/loanDetails"]);
        }
      },
      error=>console.log(error));
  }

  logout(){
    var con:boolean;
    con=confirm("Are you sure, Do you want to logout");
    if(con)
      {
        localStorage.removeItem("userName");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("password");
        this.router.navigate(["/home"]);
      }
  }

  home(){
    if(sessionStorage.getItem("userName")!=null)
    {
     var ch:boolean=confirm("Do u want to logout ?");
     if(ch){
      localStorage.removeItem("userName");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("password");
      this.router.navigate(["/home"]);
     }
    }
    else{
      this.router.navigate(["/home"]);
    }
  }
  
 
 
}
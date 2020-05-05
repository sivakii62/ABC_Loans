import { Component, OnInit } from '@angular/core';
import { LoanAccount } from 'src/app/model/LoanAccount';
import { LoanService } from 'src/app/services/loan-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-l-loan-details',
  templateUrl: './l-loan-details.component.html',
  styleUrls: ['./l-loan-details.component.css']
})
export class LLoanDetailsComponent implements OnInit {

  lacc:LoanAccount;
  constructor(private service:LoanService,private router:Router) { }

  ngOnInit() {
    this.service.getLacc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        return this.handleresponse(response);
      },
      error=>this.handleerror(error)); 
  }

  handleresponse(response){
    this.lacc=response;
    if(this.lacc.loanAmt==0){
      this.router.navigate(["loanModules/applyLoan"]);
    }
   }
 
   handleerror(error){
     this.lacc=error.error.message;
   }
 

}

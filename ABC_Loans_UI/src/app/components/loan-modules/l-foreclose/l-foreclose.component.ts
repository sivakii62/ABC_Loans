import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan-service.service';
import { Router } from '@angular/router';
import { LoanAccount } from 'src/app/model/LoanAccount';

@Component({
  selector: 'app-l-foreclose',
  templateUrl: './l-foreclose.component.html',
  styleUrls: ['./l-foreclose.component.css']
})
export class LForecloseComponent implements OnInit {

  s:boolean=false;
  loanAccbal?:number;
  lacc?:LoanAccount;
  constructor(private router:Router,private service:LoanService) { }

  ngOnInit() {
    this.service.getLacc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        this.lacc=response;
        this.loanAccbal=this.lacc.loanAccBal;
      });
  }

  button(){
    this.s=true;
    if(this.loanAccbal==0){
      alert("No Pending Loan Exists.");
    }
    if(this.lacc.loanAccBal!=0){
      this.router.navigate(['/loanModules/payment',"Foreclose",this.lacc.loanAccBal]);
    }
}
}
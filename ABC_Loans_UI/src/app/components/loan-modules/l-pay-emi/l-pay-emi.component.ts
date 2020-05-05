import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan-service.service';
import { Router } from '@angular/router';
import { LoanAccount } from 'src/app/model/LoanAccount';

@Component({
  selector: 'app-l-pay-emi',
  templateUrl: './l-pay-emi.component.html',
  styleUrls: ['./l-pay-emi.component.css']
})
export class LPayEmiComponent implements OnInit {

  s:boolean=false;
  lacc?:LoanAccount;
  emi?:number;
  emisLeft?:number;
  constructor(private router:Router,private service:LoanService) { }

  ngOnInit() {
    this.service.getLacc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        this.lacc=response;
        this.emi=this.lacc.emi;
        this.emisLeft=this.lacc.emisLeft;
      });
  }
  
  button(){
    this.s=true;
      if(this.emi==0){
        alert("No Pending Loan Exists.");
      }
      if(this.emi!=0){
        this.router.navigate(['/loanModules/payment',"payEMI",this.emi]);
      }
}
}

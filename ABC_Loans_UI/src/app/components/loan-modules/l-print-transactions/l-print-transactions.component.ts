import { Component, OnInit } from '@angular/core';
import { Passbook } from 'src/app/model/Passbook';
import { LoanService } from 'src/app/services/loan-service.service';


@Component({
  selector: 'app-l-print-transactions',
  templateUrl: './l-print-transactions.component.html',
  styleUrls: ['./l-print-transactions.component.css']
})
export class LPrintTransactionsComponent implements OnInit {

  trans:Passbook[];
  constructor(private service:LoanService) { }

  ngOnInit() {
    this.service.getTransactions(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        return this.handleresponse(response);
      },
      error=>this.handleerror(error)); 

  }
 
  handleresponse(response){
    this.trans=response;
  }
  handleerror(error){
    this.trans=error.error.message;
  }
  }


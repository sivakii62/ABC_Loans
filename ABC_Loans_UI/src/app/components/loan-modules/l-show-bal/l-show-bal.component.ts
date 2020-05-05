import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan-service.service';
import { Account } from 'src/app/model/Account';
import { LoanAccount } from 'src/app/model/LoanAccount';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-l-show-bal',
  templateUrl: './l-show-bal.component.html',
  styleUrls: ['./l-show-bal.component.css']
})
export class LShowBalComponent implements OnInit {

  acc:Account;
  depositForm:FormGroup;
  laccbal:number;
  name:string;
  bal:number;
  phNo:string;
  constructor(private service:LoanService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.depositForm=this.formBuilder.group({
    amount:['',[Validators.required]],
    password:['',[Validators.required]]});

    this.service.getAcc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        return this.handleresponse(response);
      },
      error=>this.handleerror(error)); 

  }
 
  handleresponse(response){
    this.acc=response;
    this.name=this.acc.custName;
    this.bal=this.acc.balance;
    this.phNo=this.acc.phNo;
    this.laccbal=this.acc.lacc.loanAccBal;
  }
  handleerror(error){
    this.acc=error.error.message;
  }

  deposit(){
    this.router.navigate(["loanModules/deposit"]);
  }

 

  

}

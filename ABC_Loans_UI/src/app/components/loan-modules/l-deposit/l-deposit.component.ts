import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoanService } from 'src/app/services/loan-service.service';

@Component({
  selector: 'app-l-deposit',
  templateUrl: './l-deposit.component.html',
  styleUrls: ['./l-deposit.component.css']
})
export class LDepositComponent implements OnInit {
  depositForm: FormGroup;
  check:number;
  amount:number;
  submitted:boolean;
  confirmDep:boolean;
  constructor(private router:Router,private formBuilder:FormBuilder,private service:LoanService) { }

  ngOnInit() {
    this.depositForm=this.formBuilder.group({
      amount:['',[Validators.required,Validators.min(1)]],
      });
  
    }
 
  addAmt(){
    this.submitted=true;
    if(this.depositForm.invalid){
      return;
    }
    this.router.navigate(['/loanModules/payment',"Deposit",this.depositForm.value.amount]);
  }

back(){
  this.router.navigate(["loanModules/showBal"]);
}
}

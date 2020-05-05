import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan-service.service';
import { Account } from 'src/app/model/Account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-l-home',
  templateUrl: './l-home.component.html',
  styleUrls: ['./l-home.component.css']
})
export class LHomeComponent implements OnInit {

  acc?:Account={};
  custName?:string;
  mobNum?:string;
  accNum?:number;
  email?:string;
  constructor(private service:LoanService,private router:Router) { }

  ngOnInit() {
    this.service.getAcc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        return this.handleresponse(response);
      },
      error=>this.handleerror(error)); 

  }
 
  handleresponse(response){
    this.acc=response;
    this.custName=this.acc.custName;
    this.mobNum=this.acc.phNo;
    this.accNum=this.acc.accNumber;
    this.email=this.acc.email;
  }
  handleerror(error){
    this.acc=error.error.message;
  }

  editProfile(){
    this.router.navigate(['/loanModules/editProfile']);
  }
}

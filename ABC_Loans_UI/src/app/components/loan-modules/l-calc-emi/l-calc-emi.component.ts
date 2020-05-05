import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan-service.service';
import { LoanAccount } from 'src/app/model/LoanAccount';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-l-calc-emi',
  templateUrl: './l-calc-emi.component.html',
  styleUrls: ['./l-calc-emi.component.css']
})
export class LCalcEmiComponent implements OnInit {
  lacc:LoanAccount;
  calcEmiForm:FormGroup;
  EMI:number;
  s:boolean;
  msg:boolean;

  constructor(private formBuilder:FormBuilder,private service:LoanService) { }

  ngOnInit() {
    this.service.getLacc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        return this.handleresponse(response);
      },
      error=>this.handleerror(error)); 

      this.calcEmiForm=this.formBuilder.group(
        {
          loanAmt:['',[Validators.required,Validators.min(1)]],
          time:['',[Validators.required,Validators.min(1),Validators.max(5)]],
          loanType:['',Validators.required]
        }
      )
  }
 
  handleresponse(response){
    this.lacc=response;
    this.calcEmiForm.controls['loanAmt'].setValue(this.lacc.loanAmt);
    this.calcEmiForm.controls['time'].setValue(this.lacc.time);
    this.calcEmiForm.controls['loanType'].setValue(this.lacc.loanType);
  }
  handleerror(error){
    this.lacc=error.error.message;
  }

  onReset(){
    this.s=false;
    this.msg=false;
  }

  calcEMI(){
    this.s=true;
    this.msg=false;
    if(this.calcEmiForm.invalid){
      return;
    }
    this.service.calcEMI(this.calcEmiForm.value.loanAmt,this.calcEmiForm.value.loanType,this.calcEmiForm.value.time).subscribe(  
      emi=>{
        return this.handleEMI(emi);
      }); 
  }
  handleEMI(emi){
    console.log(emi);
    if(emi!=-1 && emi!=null){
      this.msg=true;
      this.EMI=emi;
    }
    else{
      this.msg=false;
      alert("please fill all the fields.");
    }
  }
  }

import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan-service.service';
import { Account } from 'src/app/model/Account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-l-edit-profile',
  templateUrl: './l-edit-profile.component.html',
  styleUrls: ['./l-edit-profile.component.css']
})
export class LEditProfileComponent implements OnInit {

  account:Account;
  editForm:FormGroup;
  constructor(private router:Router,private service:LoanService,private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.editForm=this.formBuilder.group(
      {
        name:['',[Validators.required,Validators.pattern("[A-Z][A-Z a-z]{0,24}")]],
        email:['',[Validators.required]],
        mobNum:['',[Validators.required,Validators.pattern("[6789][0-9]{9}"),Validators.minLength(10)]]
      }
    )

    this.service.getAcc(sessionStorage.getItem("userName")).subscribe(  
      response=>{
        return this.handleresponse(response);
      },
      error=>this.handleerror(error)); 
  }

  handleresponse(response){
    this.account=response;
    this.editForm.controls['name'].setValue(this.account.custName);
    this.editForm.controls['mobNum'].setValue(this.account.phNo);
    this.editForm.controls['email'].setValue(this.account.email);
  }

  handleerror(error){
    console.log(error);
  }

  edit(){
    // console.log(sessionStorage.getItem("userName"))
    this.service.editProfile(sessionStorage.getItem("userName"),this.editForm.value.name,this.editForm.value.mobNum,this.editForm.value.email).subscribe(
      response=>{
        console.log(response);
      }
    );
    alert("Profile Updated Successfully.");
    this.router.navigate(["/loanModules/lhome"]);
  }

}

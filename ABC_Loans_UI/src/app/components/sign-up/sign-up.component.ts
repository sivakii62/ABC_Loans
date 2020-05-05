import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/model/Account';
import { LoanService } from 'src/app/services/loan-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  account:Account={};
  balance:number;
  check?:number;
  submitted:boolean=false;
  signUpForm:FormGroup;
  accCreation:boolean=true;
  msg:string;
  
  constructor(private service:LoanService,private formBuilder:FormBuilder,private router:Router) { 
  }
  ngOnInit() {
    this.accCreation=true;
    this.signUpForm=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.pattern("[A-Z][A-Z a-z]{0,11}")]],
      lastName:['',[Validators.required,Validators.pattern("[A-Z a-z]{0,11}")]],
      mobileNumber:['',[Validators.required,Validators.pattern("[6789][0-9]{9}"),Validators.minLength(10)]],
      iDeposit:['',[Validators.required,Validators.min(1000)]],
      password:['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,19}')]],
      confirmpassword:['',[Validators.required]],
      transPassword:['',[Validators.required]],
      confirmTransPassword:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      userName:['',[Validators.required,Validators.pattern("[A-Z a-z]{0,9}")]]
  },
  {validators: [this.passwordCheck.bind(this),this.transPasswordCheck.bind(this)]
  });

  }

  passwordCheck(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    if(password!="" && password!=null && confirmPassword!="" && confirmPassword!=null)
    return password == confirmPassword ? null : { passwordNotMatch: true };
    }

    transPasswordCheck(formGroup: FormGroup){
      const { value: transPassword } = formGroup.get('transPassword');
    const { value: confirmTransPassword } = formGroup.get('confirmTransPassword');
    if(transPassword!="" && transPassword!=null && confirmTransPassword!="" && confirmTransPassword!=null)
    return transPassword == confirmTransPassword ? null : { transPasswordNotMatch: true };
    }

  login(){
    this.router.navigate(["/login"]);
  }

  addUser(){
    this.submitted=true;
    if(this.signUpForm.invalid ){
      return;
  }
  else{
    this.account.balance=this.signUpForm.controls.iDeposit.value;
    this.account.custName=this.signUpForm.value.firstName+" "+this.signUpForm.value.lastName;
    this.account.email=this.signUpForm.value.email;
    this.account.password=this.signUpForm.value.confirmpassword;
    this.account.phNo=this.signUpForm.value.mobileNumber;
    this.account.transPassword=this.signUpForm.value.transPassword;
    this.service.addAccount(this.account,this.signUpForm.value.userName).subscribe(  
      response=>{
        return this.handleresponse(response);
      },
      err=>this.handleerror(err)); 

  }
  }

  handleresponse(response){
    this.check=response;
    if(this.check==-10){
      this.submitted=false;
      this.accCreation=false;
      // alert(`Please change the User Name,${this.signUpForm.value.userName} already Exists.`);
    }
    else{
      this.accCreation=true;
      this.msg="Hello "+this.account.custName+". Account is succesfully created, Your Account Number is "+this.check+".";
      alert(this.msg);
      this.router.navigate(["/login"]);
    }
  }
  handleerror(err){
    alert(err.error.errorMessage);
  }

  home()
  {
    this.router.navigate(["/home"]);
  }

  
}


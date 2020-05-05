import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-l-payment',
  templateUrl: './l-payment.component.html',
  styleUrls: ['./l-payment.component.css']
})
export class LPaymentComponent implements OnInit {

  paymentForm: FormGroup;
  check?: any;
  foreclosecheck?: any;
  payEmicheck?: any;
  operation: any = this.route.snapshot.paramMap.get('operation');
  amount: any = this.route.snapshot.paramMap.get('amount');
  msg: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoanService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      transPassword: ['', [Validators.required]]
    });
    if (this.operation == "Deposit") {
      this.msg = "Deposit";
    }
    if (this.operation == "payEMI") {
      this.msg = "Pay";
    }
    if (this.operation == "Foreclose") {
      this.msg = "Pay";
    }
  }

  pay() {
    this.service.validateTransaction(sessionStorage.getItem("userName"), this.paymentForm.value.transPassword).subscribe(
      response => {
        this.handleResponse(response);
      },err=>{
        alert(err.error.errorMessage);
      });
  }

  handleResponse(response) {
    this.check = response;

    if (this.check != 1) {
      alert("Invalid Transaction Password.");
    }

    if (this.check == 1) {
      if (this.operation == "Deposit") {
        this.service.deposit(sessionStorage.getItem("userName"), this.amount).subscribe(
          res => {
            console.log(res);
          }
        );
        alert(`Rs.${this.amount} is Depoisted Successfully.`);
        this.router.navigate(["/loanModules/showBal"]);
      }

      if (this.operation == "Foreclose") {
        var ch: boolean = confirm("Are you sure,Do you want to foreclose the Loan ?");
        if (ch) {
          this.service.foreClose(sessionStorage.getItem("userName")).subscribe(
            response => {
              this.foreclosecheck = response;
              if (this.foreclosecheck == 0) {
                alert("No pending Loan Exists...");
                this.router.navigate(["/loanModules/showBal"]);
              }
              if (this.foreclosecheck == 1) {
                alert("Pending Loan is Foreclosed...");
                this.router.navigate(["/loanModules/showBal"]);
              }
            },err=>{
              alert(err.error.errorMessage);
              this.router.navigate(["/loanModules/showBal"]);
            });
        }
      }

      if (this.operation == "payEMI") {

        var ch: boolean = confirm("Are you sure,Do you want to Pay EMI ?");
        if (ch) {
          this.service.payEMI(sessionStorage.getItem("userName")).subscribe(
            response => {
              this.payEmicheck = response;
              if (this.payEmicheck == 1) {
                alert("EMI paid Successfully...");
                this.router.navigate(["/loanModules/showBal"]);
              }
              if (this.payEmicheck == 0) {
                alert("No Pending Loan Exists...");
                this.router.navigate(["/loanModules/showBal"]);
              }
              if (this.payEmicheck == 5) {
                alert("EMI paid and the Existing Loan is Foreclosed...");
                this.router.navigate(["/loanModules/showBal"]);
              }
              
            },err=>{
              alert(err.error.errorMessage);
              this.router.navigate(["/loanModules/showBal"]);
            });
        }

      }
    }

  }
}

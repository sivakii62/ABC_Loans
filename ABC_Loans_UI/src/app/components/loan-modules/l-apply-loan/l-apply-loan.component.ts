import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan-service.service';
import { LoanAccount } from 'src/app/model/LoanAccount';
import { Router } from '@angular/router';


@Component({
  selector: 'app-l-apply-loan',
  templateUrl: './l-apply-loan.component.html',
  styleUrls: ['./l-apply-loan.component.css']
})
export class LApplyLoanComponent implements OnInit {

  applyLoanForm: FormGroup;
  check: number;
  s: boolean = false;
  lacc: LoanAccount;

  constructor(private service: LoanService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.service.getLacc(sessionStorage.getItem("userName")).subscribe(
      response => {
        return this.handleLoanEligibility(response);
      },
      error => this.handleerror(error));

    this.applyLoanForm = this.formBuilder.group(
      {
        loanAmt: ['', [Validators.required, Validators.min(5000)]],
        assetVal: ['', [Validators.required]],
        time: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
        loanType: ['', Validators.required]
      },
      {
        validators: this.assetCheck.bind(this)
      });
  }

  onReset() {
    this.s = false;
  }

  assetCheck(formGroup: FormGroup) {
    const { value: assetVal } = formGroup.get('assetVal');
    const { value: loanAmt } = formGroup.get('loanAmt');
    if (loanAmt != "" && assetVal != "" && loanAmt != null && assetVal != null) {
      return ((1.5 * loanAmt) < assetVal) ? null : { assetError: true };
    }
  }

  applyLoan() {
    console.log(this.applyLoanForm.errors)
    this.s = true;
    if (this.applyLoanForm.invalid) {
      return;
    }

    var ch: boolean = confirm("Click Ok to proceed for applying Loan.");
    if (ch) {
      this.service.applyLoan(sessionStorage.getItem("userName"), this.applyLoanForm.value.assetVal, this.applyLoanForm.value.loanAmt,
        this.applyLoanForm.value.loanType, this.applyLoanForm.value.time).subscribe(
          response => {
            return this.handleresponse(response);
          },
          error => this.handleerror(error));
    }
  }
  handleresponse(response) {
    this.check = response;
    alert(`A Loan amount Rs.${this.applyLoanForm.value.loanAmt} is Applied Successfully.`);
    this.router.navigate(["loanModules/loanDetails"]);
  }
  handleLoanEligibility(response) {
    this.lacc = response;
    if (this.lacc.loanAmt == 0) {
      this.router.navigate(["loanModules/applyLoan"]);
    }
    else {
      this.router.navigate(["loanModules/loanDetails"]);
    }

  }
  handleerror(error) {
    this.check = error.error.message;
  }

}

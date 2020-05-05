import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
import { TermsComponent } from './components/main/terms/terms.component';
import { AboutUsComponent } from './components/main/about-us/about-us.component';
import { ContactUsComponent } from './components/main/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoanModulesComponent } from './components/loan-modules/loan-modules.component';
import { LHomeComponent } from './components/loan-modules/l-home/l-home.component';
import { LShowBalComponent } from './components/loan-modules/l-show-bal/l-show-bal.component';
import { LCalcEmiComponent } from './components/loan-modules/l-calc-emi/l-calc-emi.component';
import { LPayEmiComponent } from './components/loan-modules/l-pay-emi/l-pay-emi.component';
import { LForecloseComponent } from './components/loan-modules/l-foreclose/l-foreclose.component';
import { LPrintTransactionsComponent } from './components/loan-modules/l-print-transactions/l-print-transactions.component';
import { LApplyLoanComponent } from './components/loan-modules/l-apply-loan/l-apply-loan.component';
import { LDepositComponent } from './components/loan-modules/l-deposit/l-deposit.component';
import { LLoanDetailsComponent } from './components/loan-modules/l-loan-details/l-loan-details.component';
import { LPaymentComponent } from './components/loan-modules/l-payment/l-payment.component';
import { LEditProfileComponent } from './components/loan-modules/l-edit-profile/l-edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    TermsComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    SignUpComponent,
    LoanModulesComponent,
    LHomeComponent,
    LShowBalComponent,
    LCalcEmiComponent,
    LPayEmiComponent,
    LForecloseComponent,
    LPrintTransactionsComponent,
    LApplyLoanComponent,
    LDepositComponent,
    LLoanDetailsComponent,
    LPaymentComponent,
    LEditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

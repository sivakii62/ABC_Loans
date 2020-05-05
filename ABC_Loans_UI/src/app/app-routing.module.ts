import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/main/home/home.component';
import { AboutUsComponent } from './components/main/about-us/about-us.component';
import { ContactUsComponent } from './components/main/contact-us/contact-us.component';
import { TermsComponent } from './components/main/terms/terms.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoanModulesComponent } from './components/loan-modules/loan-modules.component';
import { LHomeComponent } from './components/loan-modules/l-home/l-home.component';
import { LApplyLoanComponent } from './components/loan-modules/l-apply-loan/l-apply-loan.component';
import { LLoanDetailsComponent } from './components/loan-modules/l-loan-details/l-loan-details.component';
import { LShowBalComponent } from './components/loan-modules/l-show-bal/l-show-bal.component';
import { LDepositComponent } from './components/loan-modules/l-deposit/l-deposit.component';
import { LCalcEmiComponent } from './components/loan-modules/l-calc-emi/l-calc-emi.component';
import { LPayEmiComponent } from './components/loan-modules/l-pay-emi/l-pay-emi.component';
import { LForecloseComponent } from './components/loan-modules/l-foreclose/l-foreclose.component';
import { LPrintTransactionsComponent } from './components/loan-modules/l-print-transactions/l-print-transactions.component';
import { LPaymentComponent } from './components/loan-modules/l-payment/l-payment.component';
import { LEditProfileComponent } from './components/loan-modules/l-edit-profile/l-edit-profile.component';



const routes: Routes = [
  {path:'',component:MainComponent,children:[
    {path:'home',component:HomeComponent},
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'signUp',component:SignUpComponent},
    {path:'aboutUs',component:AboutUsComponent},
    {path:'contactUs',component:ContactUsComponent},
    {path:'terms',component:TermsComponent},
  ]},
  // {path:'home',component:HomeComponent},
  // {path:'signUp',component:SignUpComponent},
  // {path:'login',component:LoginComponent},
  // {path:'aboutUs',component:AboutUsComponent},
  {path:'loanModules',component:LoanModulesComponent,children:[
    {path:'',component:LHomeComponent},
    {path:'applyLoan',component:LApplyLoanComponent},
    {path:'loanDetails',component:LLoanDetailsComponent},
    {path:'showBal',component:LShowBalComponent},
    {path:'deposit',component:LDepositComponent},
    {path:'calcEmi',component:LCalcEmiComponent},
    {path:'payEmi',component:LPayEmiComponent},
    {path:'foreclose',component:LForecloseComponent},
    {path:'printTransactions',component:LPrintTransactionsComponent},
    {path:'lhome',component:LHomeComponent},
    {path:'editProfile',component:LEditProfileComponent},
    {path:'payment/:operation/:amount',component:LPaymentComponent},
    {path:'**',component:LHomeComponent}
  ]},
  {path:'**',component:MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

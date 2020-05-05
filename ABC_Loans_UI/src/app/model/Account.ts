import { LoanAccount } from './LoanAccount';

export class Account{
    accNumber ?: number;
    balance ?: number;
    email ?: string;
    custName ?: string;
    phNo ?: string;
    password ?: string
    lacc ?:LoanAccount;
    transPassword?:string;
}
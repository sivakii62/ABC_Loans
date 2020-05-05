import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  baseUrl = "http://localhost:8090/loanapi/all";
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseUrl);
  }

  addAccount(account: Account, userName: string) {
    return this.http.post(`http://localhost:8090/loanapi/add/${userName}`, account, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getLacc(userName) {
    return this.http.get(`http://localhost:8090/loanapi/get/lacc/${userName}`);
  }

  payEMI(userName) {
    return this.http.get(`http://localhost:8090/loanapi/payEMI/${userName}`);
  }

  foreClose(userName) {
    return this.http.get(`http://localhost:8090/loanapi/foreClose/${userName}`);
  }

  getAcc(userName) {
    return this.http.get(`http://localhost:8090/loanapi/get/acc/${userName}`);
  }

  editProfile(userName,name, mobNum, email) {
    return this.http.put(`http://localhost:8090/loanapi/editProfile/${userName}/${name}/${mobNum}/${email}`, null);
  }

  getTransactions(userName) {
    return this.http.get(`http://localhost:8090/loanapi/print/${userName}`);
  }

  calcEMI(amt, loanType, period) {
    return this.http.get(`http://localhost:8090/loanapi/calculate/${amt}/${loanType}/${period}`);
  }

  applyLoan(userName,assetValue, amt, loanType, period) {
    return this.http.put(`http://localhost:8090/loanapi/apply/${userName}/${assetValue}/${amt}/${loanType}/${period}`, null);
  }

  deposit(userName, amt) {
    return this.http.get(`http://localhost:8090/loanapi/deposit/${userName}/${amt}`);
  }

  validateLogin(userName, password) {
    return this.http.get(`http://localhost:8090/loanapi/validate/login/${userName}/${password}`);
  }

  validateTransaction(userName, transPassword) {
    return this.http.get(`http://localhost:8090/loanapi/validate/transaction/${userName}/${transPassword}`);
  }
}

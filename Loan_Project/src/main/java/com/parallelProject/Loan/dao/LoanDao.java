package com.parallelProject.Loan.dao;

import java.util.List;

import com.parallelProject.Loan.Exception.AccountNotFoundException;
import com.parallelProject.Loan.Exception.UserNameExistsException;
import com.parallelProject.Loan.entities.Account;
import com.parallelProject.Loan.entities.Loan_Account;
import com.parallelProject.Loan.entities.Passbook;

public interface LoanDao {
//	public List<Loan_Account> getAllLoanAccounts();
	
	public int addAccount(Account acc) throws UserNameExistsException;
	
	public int applyLoan(Loan_Account lacc);
	
	public Account showBalance(int accNum) throws AccountNotFoundException;
	
	public Loan_Account calculateEMI( Loan_Account lacc);
	
	public Loan_Account payEMI(Loan_Account lacc);
	
	public Loan_Account foreClose(Loan_Account lacc);
	
	public List<Passbook> printTransactions(int accNo);
	
	public List<Passbook> printAllTrans();
}


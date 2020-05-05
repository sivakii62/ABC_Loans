package com.parallelProject.Loan.service;

import java.util.List;

import com.parallelProject.Loan.Exception.AccountNotFoundException;
import com.parallelProject.Loan.Exception.InsufficientBalanceException;
import com.parallelProject.Loan.Exception.LoanAccountNotFoundException;
import com.parallelProject.Loan.Exception.UserNameExistsException;
import com.parallelProject.Loan.entities.Account;
import com.parallelProject.Loan.entities.Loan_Account;
import com.parallelProject.Loan.entities.Passbook;

public interface LoanService {
//	public List<Loan_Account> getAll();
	
	public Loan_Account getCustomerByUserName(String un) throws LoanAccountNotFoundException;
	
	public int addAccount(Account acc,String userName) throws UserNameExistsException, LoanAccountNotFoundException;
	
	public int applyLoan(String userName,double assetVal,double loanAmount,String loanType,int time) throws LoanAccountNotFoundException;
	
	public Account showBalance(int accNum) throws AccountNotFoundException;
	
	public Loan_Account calculateEMI( String userName) throws LoanAccountNotFoundException;
	
	//For Manual EMI calculation.
	public double calculateEMI(double b,String loanType,int period);
	
	public int payEMI( String userName) throws AccountNotFoundException, LoanAccountNotFoundException, InsufficientBalanceException;
	
	public int Deposit(String un,double amt) throws AccountNotFoundException, LoanAccountNotFoundException;
	
	public int foreClose( String userName) throws AccountNotFoundException, LoanAccountNotFoundException, InsufficientBalanceException;
	
	public List<Passbook> printTransactions( String userName) throws LoanAccountNotFoundException;
	
	public List<Passbook> printAllTrans();
	
}

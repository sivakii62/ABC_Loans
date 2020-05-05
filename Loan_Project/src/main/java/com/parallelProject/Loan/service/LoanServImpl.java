package com.parallelProject.Loan.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.parallelProject.Loan.Exception.AccountNotFoundException;
import com.parallelProject.Loan.Exception.BadCredentialsException;
import com.parallelProject.Loan.Exception.InsufficientBalanceException;
import com.parallelProject.Loan.Exception.LoanAccountNotFoundException;
import com.parallelProject.Loan.Exception.UserNameExistsException;
import com.parallelProject.Loan.dao.LoanDaoImpl;
import com.parallelProject.Loan.entities.Account;
import com.parallelProject.Loan.entities.Loan_Account;
import com.parallelProject.Loan.entities.Passbook;

@Service
@Transactional
public class LoanServImpl implements LoanService {
	@Autowired
	LoanDaoImpl loanDaoImpl;

	HashMap<String, Integer> rate = new HashMap<String, Integer>();

	public LoanServImpl() {
		rate.put("Home", 7);
		rate.put("Educational", 2);
		rate.put("Vehicle", 9);
		rate.put("Personal", 11);
	}


	@Override

	public int addAccount(Account acc, String userName) throws UserNameExistsException, LoanAccountNotFoundException {
		
		if(getCustomerByUserName(userName)==null) {
			acc.setLacc(new Loan_Account());
			acc.getLacc().setUserName(userName);
			acc.getLacc().setEmi(0.0);
			acc.getLacc().setEmisLeft(0);
			acc.getLacc().setLoanAccBal(0.0);
			acc.getLacc().setAssetVal(0.0);
			acc.getLacc().setLoanType(null);
			acc.getLacc().setTime(0);
			acc.getLacc().setLoanAmt(0.0);	
			return loanDaoImpl.addAccount(acc);
		}
		else {
			throw new UserNameExistsException("User Name exists.Please select different User Name.");
		}
		
	}

	@Override

	public int applyLoan(String userName, double assetVal, double loanAmount, String loanType, int time) throws LoanAccountNotFoundException {

		Loan_Account lacc = loanDaoImpl.getLoanAccountByUserName(userName);
		if (assetVal > 0 && loanAmount > 0 || lacc.getLoanAccBal() > 0) {
			if (assetVal > 1.5 * (loanAmount) || lacc.getLoanAccBal() > 0) {
				if (lacc.getLoanAccBal() == 0) {
					lacc.setAssetVal(assetVal);
					lacc.setLoanType(loanType);
					lacc.setTime(time);
					lacc.setEmisLeft(time*12);
					lacc.setLoanAmt(loanAmount);
					calculateEMI(userName);
					lacc.setLoanAccBal(lacc.getEmi() * lacc.getTime() * 12);
					return loanDaoImpl.applyLoan(lacc);
				} else {
					return -3;
				}
			} else {
				return -1;
			}
		}
		return 0;
	}

	@Override

	public Account showBalance(int accNum) throws AccountNotFoundException {
		return loanDaoImpl.showBalance(accNum);

	}

	@Override
	public Loan_Account calculateEMI(String userName) throws LoanAccountNotFoundException {

		Loan_Account lacc = loanDaoImpl.getLoanAccountByUserName(userName);
		if (lacc.getLoanAmt() == 0) {
			return lacc;
		}
		int period = lacc.getTime();
		int roi = rate.get(lacc.getLoanType());
		double b = lacc.getLoanAmt();
		if (b != 0 && period > 0 && roi > 0) {
			if (lacc.getEmi() != 0 && lacc.getEmi() > 0)
				return loanDaoImpl.calculateEMI(lacc);

			else {
				double emi = Math.ceil((b + (b * roi * period) / 100) / (period * 12));
				lacc.setEmi(emi);
				return loanDaoImpl.calculateEMI(lacc);
			}
		}
		return lacc;
	}

	@Override
	public double calculateEMI(double b, String loanType, int period) {
		int roi = rate.get(loanType);
		if (b != 0 && period > 0 && roi > 0) {
			return (Math.ceil((b + (b * roi * period) / 100) / (period * 12)));
		} else {
			return 0.0;
		}
	}

	@Override
	public int payEMI(String userName) throws AccountNotFoundException, LoanAccountNotFoundException, InsufficientBalanceException {
		Loan_Account lacc = loanDaoImpl.getLoanAccountByUserName(userName);
		Account acc = loanDaoImpl.getAccountByAccNum(lacc.getAccNumber());
		if (lacc.getEmi() > acc.getBalance()) {
			throw new InsufficientBalanceException("Insufficent Balance.");
		}

		if (lacc.getLoanAccBal() != 0 && lacc.getEmi() > 0) {
			acc.setBalance(acc.getBalance() - lacc.getEmi());
			lacc.setEmisLeft(lacc.getEmisLeft()-1);
			lacc.setLoanAccBal(lacc.getLoanAccBal() - lacc.getEmi());
			loanDaoImpl.payEMI(lacc);
			if (lacc.getLoanAccBal() == 0) {
				foreClose(userName);
				return 5;
			}
			return 1;

		}

		return 0;
	}

	@Override
	public int foreClose(String userName) throws AccountNotFoundException, LoanAccountNotFoundException, InsufficientBalanceException {
		Loan_Account lacc = loanDaoImpl.getLoanAccountByUserName(userName);
		Account acc = loanDaoImpl.getAccountByAccNum(lacc.getAccNumber());
		if (lacc.getLoanAmt() > 0 && acc.getBalance() > lacc.getLoanAccBal()) {
			acc.setBalance(acc.getBalance() - lacc.getLoanAccBal());
			lacc.setAssetVal(0.0);
			lacc.setLoanType(null);
			lacc.setTime(0);
			lacc.setEmisLeft(0);
			lacc.setLoanAmt(0);
			lacc.setEmi(0.0);
			loanDaoImpl.foreClose(lacc);
			return 1;
		}
		if (lacc.getLoanAmt() > 0 && acc.getBalance() < lacc.getLoanAccBal()) {
			throw new InsufficientBalanceException("Insufficent Balance.");
		}
		return 0;
	}

	@Override
	public List<Passbook> printTransactions(String userName) throws LoanAccountNotFoundException {
		Loan_Account lacc = loanDaoImpl.getLoanAccountByUserName(userName);
		return loanDaoImpl.printTransactions(lacc.getAccNumber());
	}

	@Override
	public List<Passbook> printAllTrans() {

		return loanDaoImpl.printAllTrans();
	}

	@Override
	public Loan_Account getCustomerByUserName(String un) throws LoanAccountNotFoundException {
		return loanDaoImpl.getLoanAccountByUserName(un);
	}

	@Override
	public int Deposit(String un, double amt) throws AccountNotFoundException, LoanAccountNotFoundException {
		Account acc = getCustomerByAccNumber(getCustomerByUserName(un).getAccNumber());
		acc.setBalance(acc.getBalance() + amt);
		return loanDaoImpl.depositTransaction(acc, amt);
	}

	public Account getCustomerByAccNumber(int accNum) throws AccountNotFoundException {
		return loanDaoImpl.getAccountByAccNum(accNum);
	}
	
	public void updateAccount(String userName,String name,String phNo,String email) throws LoanAccountNotFoundException, AccountNotFoundException {
		int accNo=getCustomerByUserName(userName).getAccNumber();
		Account acc=getCustomerByAccNumber(accNo);
		acc.setCustName(name);
		acc.setPhNo(phNo);
		acc.setEmail(email);
		loanDaoImpl.mergeAccount(acc);
	}
	
	public int validateLogin(String userName,String password) throws LoanAccountNotFoundException, AccountNotFoundException, BadCredentialsException {
		Loan_Account lacc = getCustomerByUserName(userName);
		if (!getCustomerByAccNumber(lacc.getAccNumber()).getPassword().equals(password)) {
			throw new BadCredentialsException("Invalid Credentials");
		}
		return 1;
	}
	
	public int validateTransaction(String userName,String transPassword) throws LoanAccountNotFoundException, AccountNotFoundException, BadCredentialsException {
		Loan_Account lacc = getCustomerByUserName(userName);
		if (!getCustomerByAccNumber(lacc.getAccNumber()).getTransPassword().equals(transPassword)) {
			throw new BadCredentialsException("Invalid Credentials");
		}
		return 1;
	}
}

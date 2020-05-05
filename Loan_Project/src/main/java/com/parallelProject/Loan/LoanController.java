package com.parallelProject.Loan;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parallelProject.Loan.Exception.AccountNotFoundException;
import com.parallelProject.Loan.Exception.BadCredentialsException;
import com.parallelProject.Loan.Exception.InsufficientBalanceException;
import com.parallelProject.Loan.Exception.LoanAccountNotFoundException;
import com.parallelProject.Loan.Exception.UserNameExistsException;
import com.parallelProject.Loan.entities.Account;
import com.parallelProject.Loan.entities.Loan_Account;
import com.parallelProject.Loan.entities.Passbook;
import com.parallelProject.Loan.service.LoanServImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/loanapi")
public class LoanController {
	@Autowired
	LoanServImpl loanServImpl;

	
	@PostMapping("/add/{userName}")
	public int addAccount(@PathVariable String userName, @RequestBody Account acc) throws  UserNameExistsException, LoanAccountNotFoundException {
		return loanServImpl.addAccount(acc, userName);
	}

	@PutMapping("/apply/{userName}/{assetVal}/{loanAmount}/{loanType}/{time}")
	public int applyLoan(@PathVariable String userName, @PathVariable double assetVal, @PathVariable double loanAmount,
			@PathVariable String loanType, @PathVariable int time) throws LoanAccountNotFoundException {

		return loanServImpl.applyLoan(userName, assetVal, loanAmount, loanType, time);
	}

	@GetMapping("/get/lacc/{userName}")
	public Loan_Account getLoanAcc(@PathVariable String userName) throws LoanAccountNotFoundException {
		return loanServImpl.getCustomerByUserName(userName);
	}

	@GetMapping("/get/acc/{userName}")
	public Account getAcc(@PathVariable String userName) throws AccountNotFoundException, LoanAccountNotFoundException {
		return loanServImpl.showBalance(loanServImpl.getCustomerByUserName(userName).getAccNumber());
	}

	@GetMapping("/calculate/{userName}")
	public Loan_Account calculateEMI(@PathVariable String userName) throws LoanAccountNotFoundException {
	
		return loanServImpl.calculateEMI(userName);
	}

	@GetMapping("/calculate/{amt}/{loanType}/{period}")
	public double calculateEMI(@PathVariable double amt, @PathVariable String loanType, @PathVariable int period) {
		if (amt == 0 || period == 0 || loanType.equals(null)) {
			return -1;
		}
		return loanServImpl.calculateEMI(amt, loanType, period);
	}

	@GetMapping("/payEMI/{userName}")
	public int payEMI(@PathVariable String userName) throws AccountNotFoundException, LoanAccountNotFoundException, InsufficientBalanceException {
		
		return loanServImpl.payEMI(userName);
	}

	@GetMapping("/foreClose/{userName}")
	public int foreClose(@PathVariable String userName) throws AccountNotFoundException, LoanAccountNotFoundException, InsufficientBalanceException {

		return loanServImpl.foreClose(userName);
	}

	@GetMapping("/print/{userName}")
	public List<Passbook> printAll(@PathVariable String userName) throws LoanAccountNotFoundException {
		
		return loanServImpl.printTransactions(userName);
	}

	@GetMapping("/printAll")
	public List<Passbook> printAllTrans() {
		return loanServImpl.printAllTrans();
	}

	@GetMapping("/deposit/{userName}/{amt}")
	public int deposit(@PathVariable String userName, @PathVariable double amt) throws AccountNotFoundException, LoanAccountNotFoundException {
		
		return loanServImpl.Deposit(userName, amt);
	}

	@GetMapping("/validate/login/{userName}/{password}")
	public int validateLogin(@PathVariable String userName, @PathVariable String password) throws AccountNotFoundException, LoanAccountNotFoundException, BadCredentialsException {
		
		return loanServImpl.validateLogin(userName, password);
	}
	
	@GetMapping("/validate/transaction/{userName}/{transPassword}")
	public int validateTransaction(@PathVariable String userName, @PathVariable String transPassword) throws AccountNotFoundException, LoanAccountNotFoundException, BadCredentialsException {
		
		return loanServImpl.validateTransaction(userName, transPassword);
	}
	
	@PutMapping("/editProfile/{userName}/{name}/{phNo}/{email}")
	public int editProfile(@PathVariable String userName,@PathVariable String name,@PathVariable String phNo,@PathVariable String email) throws AccountNotFoundException, LoanAccountNotFoundException {
		
		loanServImpl.updateAccount(userName,name,phNo,email);
		return 1;
		
	}

}

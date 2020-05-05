package com.parallelProject.Loan;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.parallelProject.Loan.Exception.InsufficientBalanceException;
import com.parallelProject.Loan.entities.Account;
import com.parallelProject.Loan.service.LoanServImpl;

@SpringBootTest
@Transactional
@Rollback(true)
class LoanApplicationTests {

	@Autowired
	public LoanServImpl service;


	// Test case to validate user with their password
	@Test
	public void validateUserTest() throws Exception {
		
		service.addAccount(new Account("test@gmail.com", "testUser", 50000, "dF2@hjkl", "testCustomer",
				"9874563210", "1234"), "testUser");

		// Test case passes only when the passwords matches
		assertEquals(1, service.validateLogin("testUser", "dF2@hjkl"));
	}
	
	

	// Test case to validate user Account Details
	@Test
	public void validateAccountDetailsTest() throws Exception {
		int x=service.addAccount(new Account("test@gmail.com", "testUser", 50000, "dF2@hjkl", "testCustomer",
				"9874563210", "1234"), "testUser");

		Account account = service.getCustomerByAccNumber(x);

		assertEquals("testCustomer", account.getCustName());
		assertEquals(50000, account.getBalance());
		assertEquals("test@gmail.com", account.getEmail());
		assertEquals("9874563210", account.getPhNo());

	}
	
	

	// Test case to validate pay EMI condition when user Account Balance is insufficient
	@Test
	public void PayEmiTest() throws Exception {
		
		Account account = new Account("test@gmail.com", "testPayEmi", 10, "dF2@hjkl", "testCustomer",
				"9874563210", "1234");
		service.addAccount(account, "manish");
		service.applyLoan(account.getLacc().getUserName(), 25000, 12000, "Home", 1);

		assertThrows(InsufficientBalanceException.class, () -> {
			service.payEMI(account.getLacc().getUserName());
		});

	}
	
	

	// Test case to validate Fore_closing condition when user Account Balance is insufficient
	@Test
	public void ForecloseTest() throws Exception {
		
		Account account = new Account("test@gmail.com", "testPayEmi", 10, "dF2@hjkl", "testCustomer",
				"9874563210", "1234");
		service.addAccount(account, "surya");
		service.applyLoan(account.getLacc().getUserName(), 25000, 12000, "Home", 1);

		assertThrows(InsufficientBalanceException.class, () -> {
			service.foreClose(account.getLacc().getUserName());
		});

	}
	
	
	
	// Test case to validate one account should have only one loan account in process
	@Test
	public void LoanEligibilityTest() throws Exception {
		Account account = new Account("test@gmail.com", "testPayEmi", 10, "dF2@hjkl", "testCustomer",
				"9874563210", "1234");
		service.addAccount(account, "hari");
		service.applyLoan(account.getLacc().getUserName(), 25000, 12000, "Home", 1);
		
		assertEquals(-3, service.applyLoan(account.getLacc().getUserName(), 25000, 12000, "Home", 1));

	}
	
	// Test case to EMIs Left before and after Loan applying.
	@Test
	public void EMITest() throws Exception {
		Account account = new Account("test@gmail.com", "testPayEmi", 10, "dF2@hjkl", "testCustomer",
				"9874563210", "1234");
		service.addAccount(account, "hari");
		//Before Applying Loan
		assertEquals(0, service.getCustomerByUserName("hari").getEmisLeft());
		service.applyLoan(account.getLacc().getUserName(), 25000, 12000, "Home", 1);
		//After Applying Loan
		//EMIsLeft = 12* Tenure Period
		assertEquals(12, service.getCustomerByUserName("hari").getEmisLeft());

	}

}

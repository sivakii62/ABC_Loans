package com.parallelProject.Loan.Exception;

public class AccountNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public AccountNotFoundException() {
		super();
	}

	public AccountNotFoundException(final String message) {
		super(message);

	}

}

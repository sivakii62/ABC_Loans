package com.parallelProject.Loan.Exception;

public class InsufficientBalanceException  extends Exception {

	private static final long serialVersionUID = 1L;

	public InsufficientBalanceException() {
		super();
	}

	public InsufficientBalanceException(final String message) {
		super(message);

	} 

}

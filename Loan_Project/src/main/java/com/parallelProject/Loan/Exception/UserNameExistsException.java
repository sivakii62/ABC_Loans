package com.parallelProject.Loan.Exception;

public class UserNameExistsException  extends Exception {

	private static final long serialVersionUID = 1L;

	public UserNameExistsException() {
		super();
	}

	public UserNameExistsException(final String message) {
		super(message);

	}
}

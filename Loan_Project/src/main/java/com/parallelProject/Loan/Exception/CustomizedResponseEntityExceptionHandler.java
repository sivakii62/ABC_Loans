package com.parallelProject.Loan.Exception;

import javax.servlet.http.HttpServletRequest;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;





@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(LoanAccountNotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleResourceNotFound(final LoanAccountNotFoundException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse("Loan Account Does Not Exists");
		return error;
	}
	
	@ExceptionHandler(AccountNotFoundException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleResourceNotFound(final AccountNotFoundException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse("Account Does Not Exists");
		return error;
	}
	
	@ExceptionHandler(UserNameExistsException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleUserNameExistsException(final UserNameExistsException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}
	
	@ExceptionHandler(InsufficientBalanceException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	public @ResponseBody ExceptionResponse handleInsufficientBalance(final InsufficientBalanceException exception,final HttpServletRequest request) {
		ExceptionResponse error = new ExceptionResponse(exception.getLocalizedMessage());
		return error;
	}
	
	@ExceptionHandler({BadCredentialsException.class,Exception.class})
	protected ResponseEntity<Object> handleInvalidLogin(BadCredentialsException ex){
		return new ResponseEntity<Object>(new ExceptionResponse(ex.getLocalizedMessage()),HttpStatus.FORBIDDEN);
	}
}

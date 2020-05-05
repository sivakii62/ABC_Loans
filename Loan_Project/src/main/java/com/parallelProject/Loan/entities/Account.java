package com.parallelProject.Loan.entities;

import javax.persistence.CascadeType;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import javax.persistence.Table;

@Entity
@Table(name = "abc_accounts")
public class Account {

	@Id
	@Column(name = "ACCNUMBER")
	public int accNumber;
	@Column(name = "BANK_BALANCE")
	private double balance;
	@Column(name = "EMAIL")
	public String email;
	@Column(name = "CUSTNAME")
	private String custName;
	@Column(name = "PHNO")
	private String phNo;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "USERNAME")
	private Loan_Account lacc;

	@Column(name = "PASSWORD")
	private String password;
	
	@Column(name = "TRANSACTION_PASSWORD")
	private String transPassword;

	public Account() {

	}

	public Account(String email, String userName, double balance, String password, String custName, String phNo,String transPassword) {
		super();
		this.custName = custName;
		this.balance = balance;
		this.email = email;
		this.phNo = phNo;
		this.password = password;
		this.transPassword=transPassword;
	}
	

	public int getAccNumber() {
		return accNumber;
	}

	public void setAccNumber(int accNumber) {
		this.accNumber = accNumber;
	}

	public Loan_Account getLacc() {
		return lacc;
	}

	public void setLacc(Loan_Account lacc) {
		this.lacc = lacc;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getTransPassword() {
		return transPassword;
	}
	
	public void setTransPassword(String transPassword) {
		this.transPassword = transPassword;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getPhNo() {
		return phNo;
	}

	public void setPhNo(String phNo) {
		this.phNo = phNo;
	}

}

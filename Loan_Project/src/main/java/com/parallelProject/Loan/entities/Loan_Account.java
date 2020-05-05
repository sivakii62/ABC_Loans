package com.parallelProject.Loan.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "abc_loans")
public class Loan_Account {

	@Id
	@Column(name = "USERNAME")
	public String userName;
	@Column(name = "ACCNUMBER")
	public int accNumber;
	@Column(name = "ASSETVAL")
	private double assetVal;
	@Column(name = "Loan_Type")
	private String loanType;
	@Column(name = "TENURE_PERIOD")
	private int time;
	@Column(name = "LOAN_AMOUNT")
	private double loanAmt;
	@Column(name = "LOANACCBAL")
	private double loanAccBal;
	@Column(name = "EMI")
	private double emi;
	@Column(name = "EMISLEFT")
	private Integer emisLeft;

	public Loan_Account() {
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public double getAssetVal() {
		return assetVal;
	}

	public void setAssetVal(double assetVal) {
		this.assetVal = assetVal;
	}

	public double getLoanAccBal() {
		return loanAccBal;
	}

	public void setLoanAccBal(double loanAccBal) {
		this.loanAccBal = loanAccBal;
	}

	public double getLoanAmt() {
		return loanAmt;
	}

	public void setLoanAmt(double loanAmt) {
		this.loanAmt = loanAmt;
	}

	public double getEmi() {
		return emi;
	}

	public void setEmi(double emi) {
		this.emi = emi;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	public int getAccNumber() {
		return accNumber;
	}

	public void setAccNumber(int accNumber) {
		this.accNumber = accNumber;
	}

	public int getEmisLeft() {
		return emisLeft;
	}

	public void setEmisLeft(Integer emisLeft) {
		this.emisLeft = emisLeft;
	}

}

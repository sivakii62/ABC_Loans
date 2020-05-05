package com.parallelProject.Loan.entities;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Passbook")
public class Passbook implements Comparable<Passbook> {
	@Id
	@Column(name = "TId")
	private Integer tId;
	@Column(name = "ACCNUM")
	private int accNum;
	@Column(name = "Date_Time")
	private String date_Time;
	@Column(name = "TRANSACTION")
	private String transaction;

	public Passbook() {

	}

	public Integer getTId() {
		return tId;
	}

	public void setTId(Integer tId) {
		this.tId = tId;
	}

	public int getAccNum() {
		return accNum;
	}

	public void setAccNum(int accNum) {
		this.accNum = accNum;
	}

	public String getTransaction() {
		return transaction;
	}

	public void setTransaction(String transaction) {
		this.transaction = transaction;
	}

	public String getDt() {
		return date_Time;
	}

	public void setDt(String dt) {
		this.date_Time = dt;
	}

	@Override
	public String toString() {
		return "Transactions [tId=" + tId + ", accNum=" + accNum + ", transaction=" + transaction + "]";
	}

	public Passbook(int tId, int accNum, String transaction) {

		this.tId = tId;
		this.accNum = accNum;
		this.transaction = transaction;
	}

	@Override
	public int compareTo(Passbook obj) {
		return this.getTId().compareTo(obj.getTId());
	}

}

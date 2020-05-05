package com.parallelProject.Loan.dao;

import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.parallelProject.Loan.Exception.AccountNotFoundException;
import com.parallelProject.Loan.Exception.LoanAccountNotFoundException;
import com.parallelProject.Loan.entities.Account;
import com.parallelProject.Loan.entities.Loan_Account;
import com.parallelProject.Loan.entities.Passbook;

@Repository
@Transactional
public class LoanDaoImpl implements LoanDao {
	static int accNo = 2020010100;
	@Autowired
	EntityManager entityManager;


	public Account getAccountByAccNum(int accNum) throws AccountNotFoundException {
		try {
			return entityManager.find(Account.class, accNum);
		}catch(Exception ex) {
			return null;
		}
	}

	public Loan_Account getLoanAccountByUserName(String username) throws LoanAccountNotFoundException {
		try {
			return entityManager.find(Loan_Account.class, username);
		}catch(Exception ex) {
			return null;
		}
	}

	@Override
	public int addAccount(Account acc) {
		String cmd = "select c from Account c";
		TypedQuery<Account> q1 = entityManager.createQuery(cmd, Account.class);
		List<Account> usr = q1.getResultList();

		if (entityManager.find(Account.class, acc.getAccNumber()) == null) {
			if (!usr.isEmpty()) {
				String cmd2 = "select max(c.accNumber) from Account c";
				TypedQuery<Integer> q2 = entityManager.createQuery(cmd2, Integer.class);
				int accNumber = q2.getSingleResult();
				acc.setAccNumber(accNumber + 1);
			} else {
				acc.setAccNumber(accNo);
			}
			acc.getLacc().setAccNumber(acc.getAccNumber());
			entityManager.persist(acc);
			Passbook t = addEntry(acc.getLacc(), "Created Account,Initial Deposit");
			Account acc1 = entityManager.find(Account.class, acc.getAccNumber());
			t.setTransaction(t.getTransaction() + acc1.getBalance());
			entityManager.persist(t);
			return acc.getAccNumber();
		} else {
			return 0;
		}

	}

	@Override
	public int applyLoan(Loan_Account lacc) {
		entityManager.merge(lacc);
		Passbook t = addEntry(lacc, "Borrowed");
		t.setTransaction(t.getTransaction() + lacc.getLoanAmt());
		entityManager.persist(t);
		return 1;
	}

	@Override
	public Account showBalance(int accNum) throws AccountNotFoundException {
		return getAccountByAccNum(accNum);
	}

	@Override
	public Loan_Account calculateEMI(Loan_Account lacc) {
		return entityManager.merge(lacc);
	}

	@Override
	public Loan_Account payEMI(Loan_Account lacc) {
		entityManager.merge(lacc);
		Passbook t = addEntry(lacc, "EMI Paid");
		t.setTransaction(t.getTransaction() + lacc.getEmi());
		entityManager.persist(t);
		return lacc;
	}

	@Override
	public Loan_Account foreClose(Loan_Account lacc) {
		Passbook t = addEntry(lacc, "Loan Foreclosed, Amount paid");
		t.setTransaction(t.getTransaction() + lacc.getLoanAccBal());
		entityManager.persist(t);
		lacc.setLoanAccBal(0.0);
		lacc.setLoanAmt(0);
		return entityManager.merge(lacc);
	}

	@Override
	public List<Passbook> printTransactions(int accNo) {
		List<Passbook> list = new ArrayList<>();
		String cmd = "select t from Passbook t where t.accNum=:acNum";
		TypedQuery<Passbook> query3 = entityManager.createQuery(cmd, Passbook.class);
		query3.setParameter("acNum", accNo);
		list = query3.getResultList();
		Collections.sort(list, Collections.reverseOrder());
		return list;
	}

	@Override
	public List<Passbook> printAllTrans() {
		String cmd = "select t from Passbook t";
		TypedQuery<Passbook> q1 = entityManager.createQuery(cmd, Passbook.class);
		List<Passbook> list = q1.getResultList();
		Collections.sort(list);
		return list;
	}

	public Passbook addEntry(Loan_Account lacc, String s) {
		int id = 1;
		String command = "SELECT count(a.tId) from Passbook a";
		TypedQuery<Long> query1 = entityManager.createQuery(command, Long.class);
		Long count = query1.getSingleResult();
		if (count > 0) {
			command = "select max(a.tId) from Passbook a";
			TypedQuery<Integer> query = entityManager.createQuery(command, Integer.class);
			id = query.getSingleResult();
			++id;
		}
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		String dt = formatter.format(now);
		Passbook t = new Passbook(id, lacc.getAccNumber(), s + " : Rs.");
		t.setDt(dt);
		return t;
	}



	public int depositTransaction(Account acc, double amt) {
		Passbook t = addEntry(acc.getLacc(), "Deposited");
		t.setTransaction(t.getTransaction() + amt);
		entityManager.persist(t);
		return 1;
	}
	
	public void mergeAccount(Account acc) {
		entityManager.merge(acc);
	}

}

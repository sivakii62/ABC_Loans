
	1. To create a table for loan Account details for ABC Bank:
		create table abc_loans(accNumber number,username varchar2(25) primary key,LOAN_AMOUNT number,assetVal number,
		loanaccbal number,Loan_Type varchar2(20),TENURE_PERIOD number,emi number,EMISLEFT number);


	2. To create a table for Account details for ABC Bank:
	create table abc_accounts(ACCNUMBER number primary key,CUSTNAME varchar(25),BANK_BALANCE number,EMAIL varchar(30),PHNO varchar2(10),
	USERNAME varchar2(25) references abc_loans(username),PASSWORD varchar(20),TRANSACTION_PASSWORD varchar(20));


	3. To create a table for Transactions in the name of passbook:
	create table passbook(tid number primary key,accNum number,TRANSACTION VARCHAR2(45),DATE_TIME VARCHAR2(25));

	


import React, { useEffect, useState } from 'react';


const TransactionDetails = () => {
  const info = JSON.parse(localStorage.getItem('Info'))
  //console.log(info)
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getTranscation');
        let data = await response.json();
        //console.log(data)
        data = data.filter((val,ind) =>val.email == info.email).reverse()
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container-fluid mt-5 px-5">
      <h1>Transaction Details</h1>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Transaction ID: {transaction.id}</h5>
            <h6 className="card-text">Description: {transaction.description}</h6>
            <p className="card-text">Account: {transaction.account}</p>
            <p className="card-text">From: {transaction.from}</p>
            <p className="card-text">To: {transaction.to}</p>
            <p className="card-text">Gas Used: {transaction.gasUsed}</p>
            <p className="card-text">Transaction Time: {transaction.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionDetails;
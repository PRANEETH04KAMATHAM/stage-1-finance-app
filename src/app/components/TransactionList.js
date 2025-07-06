// src/components/TransactionList.js

"use client";

import { useEffect, useState } from "react";

export default function TransactionList({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data.transactions || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  return (
    <div className="p-4 mt-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((txn) => (
            <li
              key={txn._id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{txn.description}</p>
                <p className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString()}</p>
              </div>
              <p className="font-semibold text-green-600">₹{txn.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

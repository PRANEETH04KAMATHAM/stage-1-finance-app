// src/app/page.js

"use client";

import { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Personal Finance Tracker</h1>
      <TransactionForm onAdd={handleRefresh} />
      <TransactionList refresh={refreshKey} />
    </main>
  );
}

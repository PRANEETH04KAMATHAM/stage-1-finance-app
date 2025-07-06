"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function MonthlyChart({ refresh }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/transactions");
      const json = await res.json();

      if (json.success) {
        const grouped = {};

        json.data.forEach((txn) => {
          const date = new Date(txn.date);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          grouped[key] = (grouped[key] || 0) + txn.amount;
        });

        const chartData = Object.entries(grouped).map(([month, total]) => ({
          month,
          total: parseFloat(total.toFixed(2)),
        }));

        chartData.sort((a, b) => a.month.localeCompare(b.month));

        setData(chartData);
      }
    } catch (err) {
      console.error("Chart fetch error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="p-4 mt-8 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

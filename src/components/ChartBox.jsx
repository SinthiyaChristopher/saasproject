import React from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const usageData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 300 },
  { month: "Mar", users: 250 },
  { month: "Apr", users: 400 },
];

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 6500 },
  { month: "Apr", revenue: 9000 },
];

function ChartBox({ type, title }) {
  return (
    <div className="chart">
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={250}>
        {type === "line" ? (
          <LineChart data={usageData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(val) => val} />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        ) : (
          <BarChart data={revenueData}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(val) => `₹${val}`} />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default ChartBox;
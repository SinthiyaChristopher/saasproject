import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/Card";
import ChartBox from "../components/ChartBox";

function Dashboard() {
  const { activeUsers = 0, subscriptions = [], totalRevenue = 0 } = useContext(AppContext);

  return (
    <div>
      <h2>SaaS Dashboard</h2>
      <div className="cards">
        <Card title="Active Users" value={activeUsers} color="blue" />
        <Card title="Subscriptions" value={subscriptions.length} color="purple" />
        <Card title="Revenue (Monthly)" value={`₹${totalRevenue}`} color="green" />
      </div>
      <div className="charts">
        <ChartBox type="line" title="Usage Analytics" />
        <ChartBox type="bar" title="Revenue Analytics" />
      </div>
    </div>
  );
}

export default Dashboard;
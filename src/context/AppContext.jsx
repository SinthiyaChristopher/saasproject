import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Users
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  // Subscriptions
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem("subscriptions");
    return saved ? JSON.parse(saved) : [];
  });

  // Revenues
  const [revenues, setRevenues] = useState(() => {
    const saved = localStorage.getItem("revenues");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem("revenues", JSON.stringify(revenues));
  }, [revenues]);

  // ➡️ Derived values
  const activeUsers = users.filter((u) => u.active).length;
  const totalRevenue = revenues.reduce((sum, r) => sum + (Number(r.revenue) || 0), 0);

  // ➡️ User actions
  const addUser = (user) => setUsers([...users, { ...user, id: Date.now() }]);
  const updateUser = (updated) =>
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const loginUser = (id) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, active: true } : u)));
  const logoutUser = (id) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, active: false } : u)));

  // ➡️ Subscription actions
  const addSubscription = (sub) =>
    setSubscriptions([...subscriptions, { ...sub, id: Date.now() }]);
  const updateSubscription = (updated) =>
    setSubscriptions(subscriptions.map((s) => (s.id === updated.id ? updated : s)));
  const deleteSubscription = (id) =>
    setSubscriptions(subscriptions.filter((s) => s.id !== id));

  // ➡️ Revenue actions
 const addRevenue = (rev) =>
  setRevenues([...revenues, { ...rev, revenue: Number(rev.revenue), id: Date.now() }]);

const updateRevenue = (updated) =>
  setRevenues(
    revenues.map((r) =>
      r.id === updated.id ? { ...updated, revenue: Number(updated.revenue) } : r
    )
  );
  const deleteRevenue = (id) =>
    setRevenues(revenues.filter((r) => r.id !== id));

  // ➡️ Add Plans
  const addPlan = (plan) =>
    setPlans([...plans, { ...plan, price: Number(plan.price), id: Date.now() }]);
  const updatePlan = (updated) =>
    setPlans(plans.map((p) => (p.id === updated.id ? { ...updated, price: Number(updated.price) } : p)));
  const deletePlan = (id) =>
    setPlans(plans.filter((p) => p.id !== id));

  return (
    <AppContext.Provider
      value={{
        users,
        subscriptions,
        revenues,
        activeUsers,
        totalRevenue,
        addUser,
        updateUser,
        deleteUser,
        loginUser,
        logoutUser,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        addRevenue,
        updateRevenue,
        deleteRevenue,
        addPlan,
        updatePlan,
        deletePlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
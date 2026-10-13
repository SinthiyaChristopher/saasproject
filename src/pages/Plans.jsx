import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import PlanForm from "../components/PlanForm";
import { toast } from "react-toastify";

function Plans() {
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("plans");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Basic", price: 1000 },
      { id: 2, name: "Quarterly", price: 6000 },
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  // ➡️ Add or Update
  const handleSave = (plan) => {
    if (editPlan) {
      setPlans(plans.map((p) => (p.id === editPlan.id ? { ...editPlan, ...plan } : p)));
      toast.success("Plan updated successfully!");
    } else {
      setPlans([...plans, { id: Date.now(), ...plan }]);
      toast.success("Plan added successfully!");
    }
    setShowModal(false);
    setEditPlan(null);
  };

  // ➡️ Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((p) => p.id !== id));
      toast.error("Plan deleted!");
    }
  };

  return (
    <div>
      <h2>Pricing Plans</h2>
      <button onClick={() => setShowModal(true)}>Add Plan</button>
      <ul>
        {plans.map((p) => (
          <li key={p.id}>
            {p.name} - ₹{p.price ? Number(p.price).toLocaleString("en-IN") : 0}
            <button
              style={{ marginLeft: "10px", background: "green", color: "white" }}
              onClick={() => { setEditPlan(p); setShowModal(true); }}
            >
              Edit
            </button>
            <button
              style={{ marginLeft: "5px", background: "red", color: "white" }}
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <Modal onClose={() => { setShowModal(false); setEditPlan(null); }}>
          <PlanForm
            onSave={handleSave}
            onCancel={() => { setShowModal(false); setEditPlan(null); }}
            initialData={editPlan}
          />
        </Modal>
      )}
    </div>
  );
}

export default Plans;
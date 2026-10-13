import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/Table";
import Modal from "../components/Modal";
import SubscriptionForm from "../components/SubscriptionForm";
import { toast } from "react-toastify";

function Subscriptions() {
  const { subscriptions, addSubscription, updateSubscription, deleteSubscription } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [editSub, setEditSub] = useState(null);

  const handleSave = (sub) => {
    if (editSub) {
      updateSubscription({ ...editSub, ...sub });
      toast.success("Subscription updated successfully!");
    } else {
      addSubscription(sub);
      toast.success("Subscription added successfully!");
    }
    setShowModal(false);
    setEditSub(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      deleteSubscription(id);
      toast.error("Subscription deleted!");
    }
  };

  return (
    <div>
      <h2>Subscription Management</h2>
      <button onClick={() => setShowModal(true)}>Add Subscription</button>
      <Table
        data={subscriptions}
        onEdit={(sub) => { setEditSub(sub); setShowModal(true); }}
        onDelete={handleDelete}
        columns={["user", "plan", "status", "start", "end", "revenue"]}
        currency="₹"
      />
      {showModal && (
        <Modal onClose={() => { setShowModal(false); setEditSub(null); }}>
          <SubscriptionForm
            onSave={handleSave}
            onCancel={() => { setShowModal(false); setEditSub(null); }}
            initialData={editSub}
          />
        </Modal>
      )}
    </div>
  );
}

export default Subscriptions;
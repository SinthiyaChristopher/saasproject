import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/Table";
import Modal from "../components/Modal";
import RevenueForm from "../components/RevenueForm";
import { toast } from "react-toastify";

function Revenue() {
  const { revenues, addRevenue, updateRevenue, deleteRevenue } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [editRevenue, setEditRevenue] = useState(null);

  const handleSave = (rev) => {
    if (editRevenue) {
      updateRevenue({ ...editRevenue, ...rev });
      toast.success("Revenue record updated successfully!");
    } else {
      addRevenue({ ...rev, id: Date.now() }); // ✅ ensure each record has an id
      toast.success("Revenue record added successfully!");
    }
    setShowModal(false);
    setEditRevenue(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this revenue record?")) {
      deleteRevenue(id);
      toast.error("Revenue record deleted!");
    }
  };

  return (
    <div>
      <h2>Revenue Management</h2>
      <button onClick={() => setShowModal(true)}>Add Revenue</button>
      <Table
        data={revenues}
        onEdit={(rev) => { setEditRevenue(rev); setShowModal(true); }}
        onDelete={handleDelete}
        columns={["user", "plan", "status", "start", "end", "revenue"]}
        currency="₹"   // ✅ rupee symbol
      />

      {showModal && (
        <Modal onClose={() => { setShowModal(false); setEditRevenue(null); }}>
          <RevenueForm
            onSave={handleSave}   // ✅ correctly passed
            onCancel={() => { setShowModal(false); setEditRevenue(null); }}
            initialData={editRevenue}
          />
        </Modal>
      )}
    </div>
  );
}

export default Revenue;
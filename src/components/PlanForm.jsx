import React, { useState } from "react";

function PlanForm({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState(
    initialData || { name: "", price: 0 }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0) {
      alert("Please enter a valid plan name and price.");
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Plan Name"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (₹)"
        min="1"
      />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default PlanForm;
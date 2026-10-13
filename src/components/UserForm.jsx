import React, { useState } from "react";

function UserForm({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      role: "Customer",
      subscriptionPlan: "Basic",
      status: "Inactive",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <select name="role" value={formData.role} onChange={handleChange}>
        <option>Customer</option>
        <option>Admin</option>
        <option>Staff</option>
      </select>

      <select
        name="subscriptionPlan"
        value={formData.subscriptionPlan}
        onChange={handleChange}
      >
        <option>Basic</option>
        <option>Quarterly</option>
        <option>Yearly</option>
      </select>

      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
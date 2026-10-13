import React, { useState } from "react";

function RevenueForm({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      user: "",
      plan: "Basic",
      status: "Active",
      start: "",
      end: "",
      revenue: 0,
      paymentMethod: "",
      notes: "",
    }
  );

  // Helper: add months to a date
  const addMonths = (date, months) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d.toISOString().split("T")[0]; // format YYYY-MM-DD
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "revenue") {
      setFormData({ ...formData, [name]: Number(value) }); // ✅ convert to number
    } else if (name === "start") {
      let months = 1;
      if (formData.plan === "Quarterly") months = 3;
      if (formData.plan === "Yearly") months = 12;

      setFormData({
        ...formData,
        start: value,
        end: addMonths(value, months),
      });
    } else if (name === "plan") {
      let months = 1;
      if (value === "Quarterly") months = 3;
      if (value === "Yearly") months = 12;

      setFormData({
        ...formData,
        plan: value,
        end: formData.start ? addMonths(formData.start, months) : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.user.trim()) {
      alert("User name is required.");
      return;
    }
    if (formData.revenue <= 0) {
      alert("Revenue amount must be greater than 0.");
      return;
    }

    onSave({ ...formData, id: formData.id || Date.now() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="User Name"
      />

      <select name="plan" value={formData.plan} onChange={handleChange}>
        <option value="Basic">Basic (Monthly)</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <input type="date" name="start" value={formData.start} onChange={handleChange} />
      <input type="date" name="end" value={formData.end} readOnly />

      <input
        type="number"
        name="revenue"
        value={formData.revenue}
        onChange={handleChange}
        placeholder="Revenue (₹)"
        min="1"
      />

      <select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      >
        <option value="">Select Payment Method</option>
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Cash">Cash</option>
      </select>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes (optional)"
      ></textarea>

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default RevenueForm;
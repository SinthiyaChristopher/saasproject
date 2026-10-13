import React from "react";
import "./Table.css";

function Table({ data = [], columns = [], onEdit, onDelete, currency, extraActions }) {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col.toUpperCase()}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
              No records found
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id || row.email || row.user}>
              {columns.map((col) => (
                <td key={col}>
                  {col === "revenue" && currency
                    ? `${currency}${row[col]}`
                    : row[col]}
                </td>
              ))}
              <td>
                <button onClick={() => onEdit(row)}>Edit</button>
                <button onClick={() => onDelete(row.id)}>Delete</button>
                {extraActions && extraActions(row)}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
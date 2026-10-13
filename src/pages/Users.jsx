import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Table from "../components/Table";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";   // ✅ import your new UserForm
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const { users, addUser, updateUser, deleteUser, loginUser, logoutUser } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleSave = (user) => {
    if (editUser) {
      updateUser({ ...editUser, ...user });
      toast.success("User updated successfully!");
    } else {
      addUser({ ...user, joinedDate: new Date().toISOString().split("T")[0] });
      toast.success("User added successfully!");
    }
    setShowModal(false);
    setEditUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      toast.error("User deleted!");
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <button onClick={() => setShowModal(true)}>Add User</button>
      <Table
        data={users}
        onEdit={(user) => { setEditUser(user); setShowModal(true); }}
        onDelete={handleDelete}
        columns={["name", "email", "role", "subscriptionPlan", "joinedDate", "status"]}
        extraActions={(user) => (
          <div>
            {!user.active ? (
              <button onClick={() => loginUser(user.id)}>Login</button>
            ) : (
              <button onClick={() => logoutUser(user.id)}>Logout</button>
            )}
            <span style={{ marginLeft: "10px", color: user.active ? "green" : "red" }}>
              {user.active ? "Active" : "Inactive"}
            </span>
          </div>
        )}
      />

      {showModal && (
        <Modal onClose={() => { setShowModal(false); setEditUser(null); }}>
          <UserForm
            onSave={handleSave}
            onCancel={() => { setShowModal(false); setEditUser(null); }}
            initialData={editUser}
          />
        </Modal>
      )}
    </div>
  );
}

export default Users;
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import UserModal from "./UserModal";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { fetchDataFromApi } from "../../utils/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchDataFromApi("/api/user");
        setUsers(data.users || []);
      } catch (error) {
        toast.error("Failed to fetch users.");
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_DEV_URL}/api/user/update/${updatedUser._id}`,
        updatedUser
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      toast.success("User updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error.message);
      toast.error("Failed to update user.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DEV_URL}/api/user/delete/${userId}`
      );
      if (res.data)
        toast.success(res.data.message || "User deleted successfully.");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800 text-left">
              <th className="py-3 px-6">User Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200">
                <td className="py-3 px-6">
                  {user.firstName + " " + user.lastName}
                </td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.phone || "N/A"}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6 flex items-center gap-2">
                  <button
                    className="text-blue-500 py-2 rounded-lg hover:text-blue-600 transition duration-300"
                    onClick={() => handleEdit(user)}
                  >
                    <FaRegEdit fontSize={20} />
                  </button>
                  <button
                    className="text-red-500 py-2 rounded-lg hover:text-red-600 transition duration-300"
                    onClick={() => handleDelete(user._id)}
                  >
                    <MdDelete fontSize={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default UserManagement;

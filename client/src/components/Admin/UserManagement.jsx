import React, { useState, useEffect } from 'react';
import { fetchDataFromApi } from "../../utils/api";


const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // Simulated API call
      const data = await fetchDataFromApi('/api/user');
      setUsers(data.users || []);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management (Admin Users)</h2>
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
              <tr key={user.id} className="border-b border-gray-200">
                <td className="py-3 px-6">{user.firstName + " " + user.lastName}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">123456789</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 ml-2 rounded-lg shadow hover:bg-red-600 transition duration-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

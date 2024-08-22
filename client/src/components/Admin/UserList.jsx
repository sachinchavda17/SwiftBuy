// **components/UserList.js**
import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetchDataFromApi("/users");
      setUsers(response.users);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-lg rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Email</th>
              <th className="py-2 px-4 border-b border-gray-300">Role</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

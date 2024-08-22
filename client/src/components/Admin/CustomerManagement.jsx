import { fetchDataFromApi } from "../../utils/api";
import React, { useState, useEffect } from 'react';


const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      // Simulated API call
      const data = await fetchDataFromApi('/api/customers');
      setCustomers(data.customers || []);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800 text-left">
              <th className="py-3 px-6">Customer Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Phone</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-200">
                <td className="py-3 px-6">{customer.name}</td>
                <td className="py-3 px-6">{customer.email}</td>
                <td className="py-3 px-6">{customer.phone}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    View
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

export default CustomerManagement;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffDatapage = () => {
  const [staffData, setStaffData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch staff data
  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/staff");
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete staff
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      setStaffData(staffData.filter((staff) => staff.id !== id));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  // Handle edit staff
  const handleEdit = (staff) => {
    setEditData(staff); // Set the staff data to edit
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/staff/${editData.id}`, editData);
      fetchStaffData(); // Refresh the staff data after editing
      setShowSuccess(true); // Show success notification
      setTimeout(() => setShowSuccess(false), 3000); // Hide success notification after 3 seconds
      setEditData(null); // Clear the edit form
    } catch (error) {
      console.error("Error updating staff data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Staff Data</h1>

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          Staff details updated successfully!
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <div className="flex justify-center">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">NIC</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff) => (
                <tr key={staff.id} className="text-center">
                  <td className="border px-4 py-2">{staff.id}</td>
                  <td className="border px-4 py-2">{staff.name}</td>
                  <td className="border px-4 py-2">{staff.email}</td>
                  <td className="border px-4 py-2">{staff.contact}</td>
                  <td className="border px-4 py-2">{staff.nic}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleEdit(staff)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(staff.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Form Modal */}
      {editData && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-5">Edit Staff Data</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="border rounded w-full py-2 px-3"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editData.contact}
                onChange={(e) =>
                  setEditData({ ...editData, contact: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">NIC</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editData.nic}
                onChange={(e) =>
                  setEditData({ ...editData, nic: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDatapage;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AppoimnetDataPage = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch appointment data
  useEffect(() => {
    fetchAppointmentData();
  }, []);

  const fetchAppointmentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/appoiment");
      setAppointmentData(response.data);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appoiment/${id}`);
      setAppointmentData(
        appointmentData.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Handle edit appointment
  const handleEdit = (appointment) => {
    setEditData(appointment);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/appoiment/${editData.id}`,
        editData
      );
      fetchAppointmentData();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setEditData(null);
    } catch (error) {
      console.error("Error updating appointment data:", error);
    }
  };

  // Prepare data for the chart (appointments per doctor)
  const doctorNames = [
    ...new Set(appointmentData.map((apt) => apt.Doctor.name)),
  ];
  const appointmentCountPerDoctor = doctorNames.map(
    (doctor) =>
      appointmentData.filter(
        (appointment) => appointment.Doctor.name === doctor
      ).length
  );

  const data = {
    labels: doctorNames, // Doctor names as labels
    datasets: [
      {
        label: "Number of Appointments",
        data: appointmentCountPerDoctor, // Number of appointments per doctor
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Appointments per Doctor",
      },
    },
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Appointment Data</h1>

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          Appointment details updated successfully!
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
                <th className="border px-4 py-2">Appointment Number</th>
                <th className="border px-4 py-2">Animal Owner NIC</th>
                <th className="border px-4 py-2">Animal Name</th>
                <th className="border px-4 py-2">Doctor Name</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentData.map((appointment) => (
                <tr key={appointment.id} className="text-center">
                  <td className="border px-4 py-2">{appointment.id}</td>
                  <td className="border px-4 py-2">
                    {appointment.appointmentNumber}
                  </td>
                  <td className="border px-4 py-2">
                    {appointment.animalOwnerNic}
                  </td>
                  <td className="border px-4 py-2">
                    {appointment.Animal.name}
                  </td>
                  <td className="border px-4 py-2">
                    {appointment.Doctor.name}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(appointment.date).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-24 h-10 pb-2 rounded"
                      onClick={() => handleEdit(appointment)}
                    >
                      Edit
                    </button>
                    <div className="h-4"></div>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold w-24 h-10 pb-2 rounded "
                      onClick={() => handleDelete(appointment.id)}
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
            <h2 className="text-xl font-bold mb-5">Edit Appointment Data</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Appointment Number</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editData.appointmentNumber}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    appointmentNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Animal Owner NIC</label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3"
                value={editData.animalOwnerNic}
                onChange={(e) =>
                  setEditData({ ...editData, animalOwnerNic: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="datetime-local"
                className="border rounded w-full py-2 px-3"
                value={new Date(editData.date).toISOString().slice(0, 16)}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    date: new Date(e.target.value).toISOString(),
                  })
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
      {/* Chart Section */}
      <div className="w-full max-w-2xl mx-auto">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AppoimnetDataPage;

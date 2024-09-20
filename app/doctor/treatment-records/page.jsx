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

const TreatmentDataPage = () => {
  const [treatmentData, setTreatmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null); // State for editing a treatment

  // Fetch treatment data
  useEffect(() => {
    fetchTreatmentData();
  }, []);

  const fetchTreatmentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/treatment");
      setTreatmentData(response.data);
    } catch (error) {
      console.error("Error fetching treatment data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/treatment/${id}`);
      alert("Treatment deleted successfully");
      fetchTreatmentData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  // Handle Edit
  const handleEdit = (treatment) => {
    setEditData(treatment); // Set data for editing
  };

  // Handle Save (for edited treatment)
  const handleSave = async () => {
    try {
      const { id } = editData;
      await axios.put(`http://localhost:5000/treatment/${id}`, editData);
      alert("Treatment updated successfully");
      setEditData(null); // Reset after save
      fetchTreatmentData(); // Refresh data after save
    } catch (error) {
      console.error("Error updating treatment:", error);
    }
  };

  // Handle Change for Edit Form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Prepare data for the chart (treatment quantity per description)
  const treatmentDescriptions = [
    ...new Set(treatmentData.map((treat) => treat.description)),
  ];
  const treatmentQuantity = treatmentDescriptions.map((desc) =>
    treatmentData
      .filter((treatment) => treatment.description === desc)
      .reduce((total, t) => total + t.quantity, 0)
  );

  const data = {
    labels: treatmentDescriptions, // Treatment descriptions as labels
    datasets: [
      {
        label: "Total Quantity",
        data: treatmentQuantity, // Quantity per treatment description
        backgroundColor: "rgba(153, 102, 255, 0.6)",
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
        text: "Treatment Quantity by Description",
      },
    },
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Treatment Data</h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <div className="flex justify-center">
          <table className="table-auto border-collapse w-full mb-10">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Dosage</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Animal Name</th>
                <th className="border px-4 py-2">Owner NIC</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatmentData.map((treatment) => (
                <tr key={treatment.id}>
                  <td className="border px-4 py-2">{treatment.id}</td>
                  <td className="border px-4 py-2">{treatment.description}</td>
                  <td className="border px-4 py-2">{treatment.dosage}</td>
                  <td className="border px-4 py-2">{treatment.quantity}</td>
                  <td className="border px-4 py-2">{treatment.price}</td>
                  <td className="border px-4 py-2">{treatment.animal_name}</td>
                  <td className="border px-4 py-2">{treatment.owner_nic}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEdit(treatment)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(treatment.id)}
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

      {/* Edit Form */}
      {editData && (
        <div className="edit-form">
          <h2 className="text-xl font-bold mb-4">Edit Treatment</h2>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <input
              className="w-full border px-3 py-2"
              type="text"
              name="description"
              value={editData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Dosage</label>
            <input
              className="w-full border px-3 py-2"
              type="text"
              name="dosage"
              value={editData.dosage}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Quantity</label>
            <input
              className="w-full border px-3 py-2"
              type="number"
              name="quantity"
              value={editData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              className="w-full border px-3 py-2"
              type="text"
              name="price"
              value={editData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 ml-2 rounded"
              onClick={() => setEditData(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="mt-10">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TreatmentDataPage;

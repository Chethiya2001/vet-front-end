"use client";
import { useState, useEffect } from "react";
import SearchForm from "@/components/search";
import AnimalOwnerTable from "@/components/AnimalOwnerTable";
import SearchUpdateAnimalForm from "@/components/AnimalSearchUpdateForm";
import axios from "axios";

export default function TreatmentPage() {
  const [animalData, setAnimalData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/doctor");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = async (nic) => {
    try {
      const response = await fetch(
        `http://localhost:5000/animal/owner/nic/${nic}`
      );
      const data = await response.json();
      setAnimalData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [formData, setFormData] = useState({
    description: "",
    dosage: "",
    quantity: "",
    remark: "",
    date: "",
    price: "",
    prescription: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const response = await fetch("http://localhost:5000/treatment", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      alert("Treatment submitted successfully!");
    } else {
      alert("Error submitting treatment.");
    }
  };
  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  return (
    <div className="min-h-screen bg-white flex justify-start items-start">
      <div className="w-1/1 bg-white p-8 rounded shadow">
        <SearchForm onSearch={handleSearch} />
        <AnimalOwnerTable data={animalData} />
        <SearchUpdateAnimalForm />
      </div>
      <div className="w-full bg-white p-8 rounded shadow py-5 px-5 mt-5 mb-5">
        <label
          htmlFor="doctorDropdown"
          className="block text-lg font-medium mb-2"
        >
          Select Doctor:
        </label>
        <select
          id="doctorDropdown"
          value={selectedDoctor}
          onChange={handleDoctorChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select a doctor
          </option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        <div className="flex justify-start items-center  bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6">Treatment Form</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Treatment Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Remark</label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Fee</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Prescription (PDF)
                </label>
                <input
                  type="file"
                  name="prescription"
                  accept=".pdf"
                  onChange={handleChange}
            
                  className="w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

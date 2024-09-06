"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "@/components/search";
import AnimalOwnerTable from "@/components/AnimalOwnerTable";
import SearchUpdateAnimalForm from "@/components/AnimalSearchUpdateForm";

export default function AppoimentPage() {
  const [animalData, setAnimalData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAnimalOwnerId, setSelectedAnimalOwnerId] = useState(""); // State for animal owner ID
  const [appointmentNumber, setAppointmentNumber] = useState(""); // State for appointment number
  const [appointmentTime, setAppointmentTime] = useState(""); // State for appointment time
  const [selectedAnimalId, setSelectedAnimalId] = useState(""); // State for selected animal ID

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

  const handleApSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/appoiment/date?date=${date}`
      );
      const data = Array.isArray(response.data) ? response.data : [];
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleSubmit = async () => {
    const newAppointment = {
      appointmentNumber,
      animalOwnerNic: selectedAnimalOwnerId,
      animalId: selectedAnimalId,
      doctorId: selectedDoctor,
      date: appointmentTime,
    };
    console.log(newAppointment);

    try {
      await axios.post("http://localhost:5000/appoiment", newAppointment);
      console.log("Appointment submitted successfully");
      alert("Appointment submitted successfully");
      
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };
  return (
    <div className="min-h-screen bg-white flex justify-start items-start">
      <div className="w-1/1 bg-white p-8 rounded shadow">
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />
        {/* AnimalOwnerTable where you select the animal and animal owner */}
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

        <br />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Appointment Search</h1>
          <div className="mb-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleApSearch}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {appointments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border-b text-left">
                      Appointment Number
                    </th>
                    <th className="px-4 py-2 border-b text-left">
                      Animal Name
                    </th>
                    <th className="px-4 py-2 border-b text-left">
                      Date & Time
                    </th>
                    <th className="px-4 py-2 border-b text-left">Owner Name</th>
                    <th className="px-4 py-2 border-b text-left">Owner NIC</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">
                        {appointment.appointmentNumber}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {appointment.Animal.name}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {new Date(appointment.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {appointment.AnimalOwner.name}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {appointment.AnimalOwner.nic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Form for submitting new appointment */}
        <div className="bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Submit New Appointment</h1>

          {/* Animal Owner ID Input */}
          <div className="mb-4">
            <label
              htmlFor="animalOwnerId"
              className="block text-sm font-medium mb-1"
            >
              Animal Owner NIC
            </label>
            <input
              type="text"
              id="animalOwnerNic"
              value={selectedAnimalOwnerId}
              onChange={(e) => setSelectedAnimalOwnerId(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter animal owner ID"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="appointmentNumber"
              className="block text-sm font-medium mb-1"
            >
              Appointment Number
            </label>
            <input
              type="text"
              id="appointmentNumber"
              value={appointmentNumber}
              onChange={(e) => setAppointmentNumber(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Enter appointment number"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="appointmentDateTime"
              className="block text-sm font-medium mb-1"
            >
              Appointment Date & Time
            </label>
            <input
              type="datetime-local"
              id="date"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="animalId"
              className="block text-sm font-medium mb-1"
            >
              Animal ID
            </label>
            <input
              type="text"
              id="animalId"
              value={selectedAnimalId}
              onChange={(e) => setSelectedAnimalId(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="Animal ID"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

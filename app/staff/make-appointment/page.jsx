"use client";
import { useState, useEffect } from "react";
import SearchForm from "@/components/search";
import AnimalOwnerTable from "@/components/AnimalOwnerTable";
import SearchUpdateAnimalForm from "@/components/AnimalSearchUpdateForm";
import axios from "axios";

export default function AppoimentPage() {
  const [animalData, setAnimalData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Form state for appointment submission
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // IDs from the selected or displayed data
  const [animalOwnerId, setAnimalOwnerId] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const handleSubmitAppointment = async () => {
    try {
      // Assuming you select an appointment from the list, you will get the IDs from the selected appointment
      const selectedAppointment = appointments.find(
        (app) => app.appointmentNumber === appointmentNumber
      );

      if (selectedAppointment) {
        const response = await axios.post("http://localhost:5000/appoiment", {
          appointmentNumber,
          animalOwnerId: selectedAppointment.animalOwnerId, // Derived from selected appointment
          animalId: selectedAppointment.animalId, // Derived from selected appointment
          doctorId: selectedAppointment.doctorId, // Derived from selected appointment
          date: appointmentDate, // Use the date from the form input
        });
        console.log("Appointment submitted:", response.data);
        // Clear form inputs
        setAppointmentNumber("");
        setAppointmentDate("");
      } else {
        console.error("Appointment not found");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

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
      const data = Array.isArray(response.data) ? response.data : []; // Ensure data is an array
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
              htmlFor="appointmentTime"
              className="block text-sm font-medium mb-1"
            >
              Appointment Time
            </label>
            <input
              type="time"
              id="appointmentTime"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            onClick={handleSubmitAppointment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

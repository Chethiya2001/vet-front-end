"use client";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function PaymentPage() {
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch("http://localhost:5000/treatment");
        if (!response.ok) throw new Error("Failed to fetch treatments");
        const data = await response.json();
        setTreatments(data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, []);

  const handleSelectTreatment = (treatment) => {
    setSelectedTreatment(treatment);
  };
  const generatePDF = () => {
    if (!selectedTreatment) return;

    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text("Treatment Details", 14, 16);

    // Add Table
    doc.autoTable({
      head: [
        [
          "Description",
          "Dosage",
          "Quantity",
          "Remark",
          "Date",
          "Price",
          "Animal Name",
          "Owner NIC",
        ],
      ],
      body: [
        [
          selectedTreatment.description,
          selectedTreatment.dosage,
          selectedTreatment.quantity,
          selectedTreatment.remark,
          new Date(selectedTreatment.date).toLocaleDateString(),
          selectedTreatment.price,
          selectedTreatment.animal_name,
          selectedTreatment.owner_nic,
        ],
      ],
      startY: 30,
    });

    // Save the PDF
    doc.save("treatment-details.pdf");
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded shadow mb-8">
        <h1 className="text-2xl font-bold mb-4">Treatments</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">Dosage</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Animal Name</th>
              <th className="border p-2">Owner NIC</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((treatment) => (
              <tr key={treatment.id}>
                <td className="border p-2">{treatment.description}</td>
                <td className="border p-2">{treatment.dosage}</td>
                <td className="border p-2">{treatment.quantity}</td>
                <td className="border p-2">
                  {new Date(treatment.date).toLocaleDateString()}
                </td>
                <td className="border p-2">{treatment.price}</td>
                <td className="border p-2">{treatment.animal_name}</td>
                <td className="border p-2">{treatment.owner_nic}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSelectTreatment(treatment)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTreatment && (
        <div className="w-full max-w-xs bg-white p-8 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Selected Treatment</h2>
          <div className="mb-4">
            <strong>Animal Name:</strong> {selectedTreatment.animal_name}
          </div>
          <div className="mb-4">
            <strong>Owner NIC:</strong> {selectedTreatment.owner_nic}
          </div>
          <div className="mb-4">
            <strong>Price:</strong> {selectedTreatment.price}
          </div>
          <button
            className="w-full bg-green-500 text-white p-2 rounded mt-4"
            onClick={generatePDF}
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
}

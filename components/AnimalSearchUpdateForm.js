import { useState } from "react";

export default function SearchUpdateAnimalForm() {
  const [mode, setMode] = useState("create"); // 'create' or 'update'
  const [animalName, setAnimalName] = useState("");
  const [animalData, setAnimalData] = useState({
    id: "",
    name: "",
    address: "",
    age: "",
    breed: "",
    gender: "",
    weight: "",
    animalOwnerNic: "",
  });
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    address: "",
    age: "",
    breed: "",
    gender: "",
    weight: "",
    animalOwnerNic: "",
  });

  // Search for an animal by name
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/animal/${animalName}`
      );
      if (!response.ok) throw new Error("Animal not found");
      const data = await response.json();
      setAnimalData(data);
      setMode("update");
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    }
  };

  // Update an existing animal
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/animal/${animalData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(animalData),
        }
      );
      if (response.ok) {
        alert("Animal updated successfully");
      } else {
        alert("Failed to update animal");
      }
    } catch (error) {
      console.error("Error updating animal:", error);
    }
  };

  // Create a new animal
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/animal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnimal),
      });
      if (response.ok) {
        alert("Animal created successfully");
        setNewAnimal({
          name: "",
          address: "",
          age: "",
          breed: "",
          gender: "",
          weight: "",
          animalOwnerNic: "",
        });
      } else {
        alert("Failed to create animal");
      }
    } catch (error) {
      console.error("Error creating animal:", error);
    }
  };

  const handleChange = (e) => {
    setAnimalData({ ...animalData, [e.target.name]: e.target.value });
  };

  const handleNewAnimalChange = (e) => {
    setNewAnimal({ ...newAnimal, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full mt-8">
      {/* Search Animal Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <label htmlFor="animalName" className="block text-lg font-medium mb-2">
          Search Animal by Name:
        </label>
        <input
          type="text"
          id="animalName"
          value={animalName}
          onChange={(e) => setAnimalName(e.target.value)}
          placeholder="Enter animal name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {/* Animal Form */}
      <form
        onSubmit={mode === "update" ? handleUpdate : handleCreate}
        className="w-full"
      >
        <h2 className="text-xl font-bold mb-4">
          {mode === "update" ? "Update Animal Details" : "Create New Animal"}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="id"
            value={mode === "update" ? animalData.id : newAnimal.id}
            onChange={mode === "update" ? handleChange : handleNewAnimalChange}
            placeholder="Animal Id"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="name"
            value={mode === "update" ? animalData.name : newAnimal.name}
            onChange={mode === "update" ? handleChange : handleNewAnimalChange}
            placeholder="Name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            value={mode === "update" ? animalData.address : newAnimal.address}
            onChange={mode === "update" ? handleChange : handleNewAnimalChange}
            placeholder="Address"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="age"
            value={mode === "update" ? animalData.age : newAnimal.age}
            onChange={mode === "update" ? handleChange : handleNewAnimalChange}
            placeholder="Age"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="breed"
            value={mode === "update" ? animalData.breed : newAnimal.breed}
            onChange={mode === "update" ? handleChange : handleNewAnimalChange}
            placeholder="Breed"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="gender"
            value={mode === "update" ? animalData.gender : newAnimal.gender}
            onChange={mode === "update" ? handleChange : handleNewAnimalChange}
            placeholder="Gender"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="weight"
            value={mode === "update" ? animalData.weight : newAnimal.weight}
            onChange={mode === "update" ? handleChange : handleNewAnimalChange}
            placeholder="Weight"
            className="p-2 border border-gray-300 rounded"
          />
          {mode === "create" && (
            <input
              type="text"
              name="animalOwnerNic"
              value={newAnimal.animalOwnerNic}
              onChange={handleNewAnimalChange}
              placeholder="Owner NIC"
              className="p-2 border border-gray-300 rounded"
            />
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              mode === "update"
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {mode === "update" ? "Update" : "Create"}
          </button>
          {mode === "update" && (
            <button
              type="button"
              onClick={() => setMode("create")}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Switch to Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function AnimalOwnerTable({ data }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Animal Owner Details</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Age</th>
            <th className="border border-gray-300 p-2">Breed</th>
            <th className="border border-gray-300 p-2">Gender</th>
            <th className="border border-gray-300 p-2">Weight</th>
            <th className="border border-gray-300 p-2">Owner NIC</th>
          </tr>
        </thead>
        <tbody>
          {data.map((animal) => (
            <tr key={animal.id}>
              <td className="border border-gray-300 p-2">{animal.id}</td>
              <td className="border border-gray-300 p-2">{animal.name}</td>
              <td className="border border-gray-300 p-2">{animal.address}</td>
              <td className="border border-gray-300 p-2">{animal.age}</td>
              <td className="border border-gray-300 p-2">{animal.breed}</td>
              <td className="border border-gray-300 p-2">{animal.gender}</td>
              <td className="border border-gray-300 p-2">{animal.weight}</td>
              <td className="border border-gray-300 p-2">
                {animal.animalOwnerNic}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
